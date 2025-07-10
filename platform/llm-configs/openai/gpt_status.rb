#!/usr/bin/env ruby
# Simple GPT Status Checker
# Usage: ruby gpt_status.rb

require 'yaml'

def check_gpt_status
  puts "🤖 Noesis GPT Configuration Status\n\n"
  
  config_dir = File.join(__dir__, 'custom-gpts')
  
  unless Dir.exist?(config_dir)
    puts "❌ GPT configurations directory not found: #{config_dir}"
    return
  end
  
  subjects = Dir.glob(File.join(config_dir, '*')).select { |f| File.directory?(f) }
  
  if subjects.empty?
    puts "📂 No subject directories found in #{config_dir}"
    return
  end
  
  ready_count = 0
  total_count = 0
  
  subjects.each do |subject_dir|
    subject_name = File.basename(subject_dir)
    config_file = Dir.glob(File.join(subject_dir, '*-tutor.yml')).first
    
    total_count += 1
    
    if config_file && File.exist?(config_file)
      begin
        config = YAML.load_file(config_file)
        name = config['name'] || subject_name.tr('-', ' ').split.map(&:capitalize).join(' ')
        url = config.dig('deployment', 'chatgpt_url')
        
        if url && !url.include?('[your-gpt-id]') && !url.empty?
          puts "✅ #{name}"
          puts "   URL: #{url}"
          ready_count += 1
        else
          puts "⏳ #{name} - Not deployed yet"
          puts "   Update needed in: #{File.basename(config_file)}"
        end
        
      rescue => e
        puts "❌ #{subject_name} - Configuration error"
        puts "   Error: #{e.message}"
      end
    else
      puts "❌ #{subject_name} - No configuration file found"
    end
    
    puts
  end
  
  puts "📊 Summary: #{ready_count}/#{total_count} GPTs ready for use"
  
  if ready_count < total_count
    puts "\n💡 To update GPT URLs:"
    puts "   ruby update_gpt_urls.rb [subject] [gpt-url]"
    puts "   Example: ruby update_gpt_urls.rb algebra-1 'https://chat.openai.com/g/g-ABC123'"
  end
end

check_gpt_status
