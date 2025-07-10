#!/usr/bin/env ruby
# GPT URL Update Script
# Usage: ruby update_gpt_urls.rb [subject] [gpt_url]
# Example: ruby update_gpt_urls.rb algebra-1 "https://chat.openai.com/g/g-ABC123"

require 'yaml'
require 'fileutils'

def update_gpt_url(subject, gpt_url)
  config_dir = File.join(__dir__, 'custom-gpts', subject)
  config_file = Dir.glob(File.join(config_dir, '*-tutor.yml')).first
  
  unless config_file && File.exist?(config_file)
    puts "❌ Configuration file not found for subject: #{subject}"
    puts "   Expected: #{config_dir}/*-tutor.yml"
    return false
  end
  
  begin
    # Load existing configuration
    config = YAML.load_file(config_file)
    
    # Update the deployment URL
    config['deployment'] ||= {}
    old_url = config['deployment']['chatgpt_url']
    config['deployment']['chatgpt_url'] = gpt_url
    config['last_updated'] = Time.now.strftime('%Y-%m-%d')
    
    # Write back to file
    File.open(config_file, 'w') do |file|
      file.write(config.to_yaml)
    end
    
    puts "✅ Updated #{subject} GPT URL"
    puts "   Config: #{File.basename(config_file)}"
    puts "   Old URL: #{old_url}"
    puts "   New URL: #{gpt_url}"
    
    return true
    
  rescue => e
    puts "❌ Error updating #{subject}: #{e.message}"
    return false
  end
end

def list_gpt_status
  puts "\n📋 GPT Configuration Status:\n"
  puts "%-15s %-25s %-10s %s" % ["Subject", "Name", "Status", "URL"]
  puts "-" * 80
  
  Dir.glob(File.join(__dir__, 'custom-gpts', '*')).each do |subject_dir|
    next unless File.directory?(subject_dir)
    
    subject = File.basename(subject_dir)
    config_file = Dir.glob(File.join(subject_dir, '*-tutor.yml')).first
    
    if config_file && File.exist?(config_file)
      begin
        config = YAML.load_file(config_file)
        name = config['name'] || 'Unknown'
        url = config.dig('deployment', 'chatgpt_url') || 'Not set'
        
        status = if url.include?('[your-gpt-id]') || url == 'Not set'
          "🟡 Pending"
        else
          "🟢 Ready"
        end
        
        puts "%-15s %-25s %-10s %s" % [subject, name.truncate(23), status, url.truncate(40)]
        
      rescue => e
        puts "%-15s %-25s %-10s %s" % [subject, "Error", "🔴 Invalid", e.message.truncate(40)]
      end
    else
      puts "%-15s %-25s %-10s %s" % [subject, "Missing", "🔴 No Config", "Configuration file not found"]
    end
  end
  
  puts "\n💡 To update a GPT URL: ruby #{File.basename(__FILE__)} <subject> <url>"
end

def validate_gpt_url(url)
  return false unless url.is_a?(String)
  return false if url.empty?
  return false if url.include?('[your-gpt-id]')
  return false unless url.start_with?('https://chat.openai.com/g/g-', 'https://chatgpt.com/g/g-')
  
  true
end

# String helper for truncation
class String
  def truncate(length, omission = '...')
    return self if self.length <= length
    self[0, length - omission.length] + omission
  end
end

# Main script logic
if ARGV.empty?
  list_gpt_status
elsif ARGV.length == 1 && ARGV[0] == '--help'
  puts "GPT URL Update Script"
  puts "Usage:"
  puts "  ruby #{File.basename(__FILE__)}                    # List all GPT configurations"
  puts "  ruby #{File.basename(__FILE__)} <subject> <url>    # Update GPT URL for subject"
  puts ""
  puts "Examples:"
  puts "  ruby #{File.basename(__FILE__)} algebra-1 'https://chat.openai.com/g/g-ABC123'"
  puts "  ruby #{File.basename(__FILE__)} biology 'https://chatgpt.com/g/g-XYZ789'"
elsif ARGV.length == 2
  subject, gpt_url = ARGV
  
  unless validate_gpt_url(gpt_url)
    puts "❌ Invalid GPT URL format"
    puts "   Expected: https://chat.openai.com/g/g-[gpt-id] or https://chatgpt.com/g/g-[gpt-id]"
    puts "   Received: #{gpt_url}"
    exit 1
  end
  
  success = update_gpt_url(subject, gpt_url)
  exit success ? 0 : 1
else
  puts "❌ Invalid arguments"
  puts "Usage: ruby #{File.basename(__FILE__)} [subject] [gpt_url]"
  puts "Run with --help for more information"
  exit 1
end
