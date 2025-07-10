"""
GPT Configuration Manager

Core module for managing GPT configurations.
Designed to be API-reusable with no CLI dependencies.
"""

import yaml
import re
from pathlib import Path
from typing import Dict, List, Optional, Union
from dataclasses import dataclass
from datetime import datetime


@dataclass
class GPTConfig:
    """Represents a GPT configuration"""
    subject: str
    name: str
    description: str
    version: str
    chatgpt_url: Optional[str] = None
    access_level: str = "public"
    grade_levels: List[str] = None
    difficulty: str = "intermediate"
    config_path: Optional[Path] = None
    
    def __post_init__(self):
        if self.grade_levels is None:
            self.grade_levels = []
    
    @property
    def is_deployed(self) -> bool:
        """Check if GPT is properly deployed"""
        return (
            self.chatgpt_url is not None 
            and self.chatgpt_url != "" 
            and "[your-gpt-id]" not in self.chatgpt_url
        )
    
    @property
    def display_name(self) -> str:
        """Get display-friendly name"""
        return self.subject.replace("-", " ").title()


class GPTConfigManager:
    """
    Manager for GPT configurations.
    
    This class is designed to be reusable in both CLI and API contexts.
    It provides core functionality without any UI dependencies.
    """
    
    def __init__(self, platform_path: Union[str, Path]):
        self.platform_path = Path(platform_path)
        self.gpt_configs_path = self.platform_path / "llm-configs" / "openai" / "custom-gpts"
        self._configs_cache = None
    
    def _load_config_file(self, config_path: Path) -> Optional[Dict]:
        """Load a single configuration file"""
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                return yaml.safe_load(f)
        except Exception as e:
            return None
    
    def _save_config_file(self, config_path: Path, config_data: Dict) -> bool:
        """Save configuration to file"""
        try:
            # Update last_updated timestamp
            config_data['last_updated'] = datetime.now().strftime('%Y-%m-%d')
            
            with open(config_path, 'w', encoding='utf-8') as f:
                yaml.dump(config_data, f, default_flow_style=False, sort_keys=False)
            return True
        except Exception as e:
            return False
    
    def load_all_configs(self, force_reload: bool = False) -> Dict[str, GPTConfig]:
        """Load all GPT configurations"""
        if self._configs_cache is not None and not force_reload:
            return self._configs_cache
        
        configs = {}
        
        if not self.gpt_configs_path.exists():
            self._configs_cache = configs
            return configs
        
        # Scan each subject directory
        for subject_dir in self.gpt_configs_path.iterdir():
            if not subject_dir.is_dir():
                continue
            
            subject_name = subject_dir.name
            
            # Find the tutor config file
            config_files = list(subject_dir.glob("*-tutor.yml"))
            if not config_files:
                continue
            
            config_path = config_files[0]
            config_data = self._load_config_file(config_path)
            
            if not config_data:
                continue
            
            # Create GPTConfig object
            gpt_config = GPTConfig(
                subject=subject_name,
                name=config_data.get('name', subject_name.replace('-', ' ').title()),
                description=config_data.get('description', ''),
                version=config_data.get('version', '1.0'),
                chatgpt_url=config_data.get('deployment', {}).get('chatgpt_url'),
                access_level=config_data.get('deployment', {}).get('access_level', 'public'),
                grade_levels=config_data.get('framework', {}).get('grade_levels', []),
                difficulty=config_data.get('framework', {}).get('difficulty', 'intermediate'),
                config_path=config_path
            )
            
            configs[subject_name] = gpt_config
        
        self._configs_cache = configs
        return configs
    
    def get_config(self, subject: str) -> Optional[GPTConfig]:
        """Get configuration for a specific subject"""
        configs = self.load_all_configs()
        return configs.get(subject)
    
    def update_gpt_url(self, subject: str, gpt_url: str) -> bool:
        """Update GPT URL for a subject"""
        config = self.get_config(subject)
        if not config or not config.config_path:
            return False
        
        # Validate URL format
        if not self._validate_gpt_url(gpt_url):
            return False
        
        # Load, update, and save config
        config_data = self._load_config_file(config.config_path)
        if not config_data:
            return False
        
        # Ensure deployment section exists
        if 'deployment' not in config_data:
            config_data['deployment'] = {}
        
        config_data['deployment']['chatgpt_url'] = gpt_url
        
        success = self._save_config_file(config.config_path, config_data)
        
        # Clear cache to force reload
        if success:
            self._configs_cache = None
        
        return success
    
    def _validate_gpt_url(self, url: str) -> bool:
        """Validate GPT URL format"""
        if not url or not isinstance(url, str):
            return False
        
        # Check for placeholder
        if "[your-gpt-id]" in url:
            return False
        
        # Check URL format
        valid_patterns = [
            r"^https://chat\.openai\.com/g/g-[a-zA-Z0-9]+",
            r"^https://chatgpt\.com/g/g-[a-zA-Z0-9]+"
        ]
        
        return any(re.match(pattern, url) for pattern in valid_patterns)
    
    def get_deployment_status(self) -> Dict[str, Dict]:
        """Get deployment status for all subjects"""
        configs = self.load_all_configs()
        status = {}
        
        for subject, config in configs.items():
            status[subject] = {
                'name': config.name,
                'deployed': config.is_deployed,
                'url': config.chatgpt_url,
                'config_file': config.config_path.name if config.config_path else None
            }
        
        return status
    
    def find_subjects_with_hardcoded_links(self, docs_path: Union[str, Path]) -> List[Dict]:
        """Find markdown files with hardcoded GPT links that could be automated"""
        docs_path = Path(docs_path)
        hardcoded_links = []
        
        # Search for markdown files with chatgpt_link in frontmatter
        for md_file in docs_path.rglob("*.md"):
            try:
                content = md_file.read_text(encoding='utf-8')
                
                # Check for YAML frontmatter with chatgpt_link
                if content.startswith('---'):
                    # Extract frontmatter
                    parts = content.split('---', 2)
                    if len(parts) >= 3:
                        frontmatter = parts[1]
                        if 'chatgpt_link:' in frontmatter:
                            # Extract the URL
                            for line in frontmatter.split('\n'):
                                if 'chatgpt_link:' in line:
                                    url = line.split(':', 1)[1].strip().strip('"')
                                    
                                    hardcoded_links.append({
                                        'file': str(md_file.relative_to(docs_path)),
                                        'url': url,
                                        'full_path': str(md_file)
                                    })
                                    break
            except Exception:
                continue
        
        return hardcoded_links
    
    def remove_hardcoded_link(self, file_path: Union[str, Path]) -> bool:
        """Remove chatgpt_link from a markdown file's frontmatter"""
        file_path = Path(file_path)
        
        try:
            content = file_path.read_text(encoding='utf-8')
            
            if not content.startswith('---'):
                return False
            
            parts = content.split('---', 2)
            if len(parts) < 3:
                return False
            
            frontmatter = parts[1]
            body = parts[2]
            
            # Remove chatgpt_link line
            lines = frontmatter.split('\n')
            new_lines = [line for line in lines if not line.strip().startswith('chatgpt_link:')]
            
            # Reconstruct file
            new_frontmatter = '\n'.join(new_lines)
            new_content = f"---{new_frontmatter}---{body}"
            
            file_path.write_text(new_content, encoding='utf-8')
            return True
            
        except Exception:
            return False
    
    def get_actual_gpt_url(self, subject: str) -> Optional[str]:
        """Get the actual deployed GPT URL for a subject"""
        config = self.get_config(subject)
        if config and config.is_deployed:
            return config.chatgpt_url
        return None
