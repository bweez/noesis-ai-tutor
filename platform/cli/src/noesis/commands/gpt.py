"""
GPT Management Commands

CLI commands for managing GPT configurations.
Uses the core.gpt_manager module for API-reusable functionality.
"""

import click
from typing import Optional
from ..core.gpt_manager import GPTConfigManager


@click.group()
def gpt():
    """Manage GPT configurations and deployments"""
    pass


@gpt.command()
@click.pass_context
def status(ctx):
    """Show status of all GPT configurations"""
    manager = GPTConfigManager(ctx.obj['platform_path'])
    
    click.echo("🤖 Noesis GPT Configuration Status\n")
    
    status_data = manager.get_deployment_status()
    
    if not status_data:
        click.echo("📂 No GPT configurations found")
        return
    
    # Calculate stats
    total_count = len(status_data)
    deployed_count = sum(1 for s in status_data.values() if s['deployed'])
    
    # Display status table
    click.echo(f"{'Subject':<15} {'Name':<25} {'Status':<10} {'URL'}")
    click.echo("-" * 80)
    
    for subject, status in status_data.items():
        name = status['name'][:23] + "..." if len(status['name']) > 25 else status['name']
        status_icon = "🟢 Ready" if status['deployed'] else "⏳ Pending"
        url = status['url'][:40] + "..." if status['url'] and len(status['url']) > 40 else (status['url'] or 'Not set')
        
        click.echo(f"{subject:<15} {name:<25} {status_icon:<10} {url}")
    
    click.echo(f"\n📊 Summary: {deployed_count}/{total_count} GPTs ready for use")
    
    if deployed_count < total_count:
        click.echo("\n💡 To update GPT URLs:")
        click.echo("   noesis gpt update <subject> <gpt-url>")


@gpt.command()
@click.argument('subject')
@click.argument('gpt_url')
@click.pass_context
def update(ctx, subject: str, gpt_url: str):
    """Update GPT URL for a subject"""
    manager = GPTConfigManager(ctx.obj['platform_path'])
    
    # Check if subject exists
    config = manager.get_config(subject)
    if not config:
        click.echo(f"❌ Subject '{subject}' not found", err=True)
        
        # Show available subjects
        configs = manager.load_all_configs()
        if configs:
            click.echo("\nAvailable subjects:")
            for subj in sorted(configs.keys()):
                click.echo(f"  - {subj}")
        return
    
    # Attempt to update
    click.echo(f"Updating {subject} GPT URL...")
    
    success = manager.update_gpt_url(subject, gpt_url)
    
    if success:
        click.echo(f"✅ Updated {config.name}")
        click.echo(f"   Config: {config.config_path.name}")
        click.echo(f"   New URL: {gpt_url}")
    else:
        click.echo(f"❌ Failed to update {subject}", err=True)
        click.echo("   Check that the URL format is valid:")
        click.echo("   https://chat.openai.com/g/g-[gpt-id]")
        click.echo("   https://chatgpt.com/g/g-[gpt-id]")


@gpt.command()
@click.option('--fix', is_flag=True, help='Remove hardcoded links from files')
@click.pass_context
def audit(ctx, fix: bool):
    """Audit hardcoded GPT links in markdown files"""
    manager = GPTConfigManager(ctx.obj['platform_path'])
    
    click.echo("🔍 Auditing hardcoded GPT links...\n")
    
    hardcoded_links = manager.find_subjects_with_hardcoded_links(ctx.obj['docs_path'])
    
    if not hardcoded_links:
        click.echo("✅ No hardcoded GPT links found!")
        click.echo("All files are using the dynamic GPT system.")
        return
    
    click.echo(f"Found {len(hardcoded_links)} file(s) with hardcoded GPT links:\n")
    
    for link_info in hardcoded_links:
        click.echo(f"📄 {link_info['file']}")
        click.echo(f"   URL: {link_info['url']}")
        
        if fix:
            success = manager.remove_hardcoded_link(link_info['full_path'])
            if success:
                click.echo("   ✅ Removed hardcoded link")
            else:
                click.echo("   ❌ Failed to remove link")
        click.echo()
    
    if not fix:
        click.echo("💡 Run with --fix to automatically remove hardcoded links:")
        click.echo("   noesis gpt audit --fix")
    else:
        click.echo("🔄 Hardcoded links processed!")
        click.echo("Files now use the dynamic GPT system.")


@gpt.command()
@click.argument('subject')
@click.pass_context
def info(ctx, subject: str):
    """Show detailed information about a GPT configuration"""
    manager = GPTConfigManager(ctx.obj['platform_path'])
    
    config = manager.get_config(subject)
    if not config:
        click.echo(f"❌ Subject '{subject}' not found", err=True)
        return
    
    click.echo(f"🤖 {config.name} Configuration\n")
    
    click.echo(f"Subject: {config.subject}")
    click.echo(f"Name: {config.name}")
    click.echo(f"Description: {config.description}")
    click.echo(f"Version: {config.version}")
    click.echo(f"Difficulty: {config.difficulty}")
    
    if config.grade_levels:
        click.echo(f"Grade Levels: {', '.join(map(str, config.grade_levels))}")
    
    click.echo(f"Access Level: {config.access_level}")
    
    if config.config_path:
        click.echo(f"Config File: {config.config_path.name}")
    
    # Deployment status
    click.echo(f"\n🚀 Deployment Status:")
    if config.is_deployed:
        click.echo(f"   ✅ Deployed")
        click.echo(f"   URL: {config.chatgpt_url}")
    else:
        click.echo(f"   ⏳ Not deployed")
        if config.chatgpt_url:
            click.echo(f"   Current URL: {config.chatgpt_url}")
        else:
            click.echo(f"   No URL configured")
    
    click.echo(f"\n💡 To update URL: noesis gpt update {subject} <new-url>")


@gpt.command()
@click.pass_context
def list_subjects(ctx):
    """List all available subjects"""
    manager = GPTConfigManager(ctx.obj['platform_path'])
    
    configs = manager.load_all_configs()
    
    if not configs:
        click.echo("📂 No subjects found")
        return
    
    click.echo(f"📚 Available Subjects ({len(configs)}):\n")
    
    for subject, config in sorted(configs.items()):
        status = "🟢" if config.is_deployed else "⏳"
        click.echo(f"{status} {subject:<15} - {config.name}")
    
    click.echo(f"\n💡 Use 'noesis gpt info <subject>' for detailed information")


@gpt.command()
@click.argument('subject')
@click.pass_context
def get_url(ctx, subject: str):
    """Get the GPT URL for a specific subject"""
    manager = GPTConfigManager(ctx.obj['platform_path'])
    
    config = manager.get_config(subject)
    if not config:
        click.echo(f"❌ Subject '{subject}' not found", err=True)
        return
    
    if config.is_deployed:
        click.echo(config.chatgpt_url)
    else:
        click.echo(f"❌ {subject} GPT not deployed yet", err=True)
