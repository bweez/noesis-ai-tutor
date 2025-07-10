require 'yaml'

module Jekyll
  # Custom generator to load GPT configurations and make them available site-wide
  class GPTConfigGenerator < Generator
    safe true
    priority :high

    def generate(site)
      # Path to GPT configurations
      gpt_configs_path = File.join(site.source, '../platform/llm-configs/openai/custom-gpts')
      
      # Initialize the gpt_configs hash in site.data
      site.data['gpt_configs'] ||= {}
      
      # Return early if the GPT configs directory doesn't exist
      return unless Dir.exist?(gpt_configs_path)
      
      # Process each subject directory
      Dir.glob(File.join(gpt_configs_path, '*')).each do |subject_dir|
        next unless File.directory?(subject_dir)
        
        subject_name = File.basename(subject_dir)
        config_file = Dir.glob(File.join(subject_dir, '*-tutor.yml')).first
        
        next unless config_file && File.exist?(config_file)
        
        begin
          # Load the YAML configuration
          config_data = YAML.load_file(config_file)
          
          # Extract relevant information
          gpt_info = {
            'name' => config_data['name'],
            'description' => config_data['description'],
            'version' => config_data['version'],
            'chatgpt_url' => config_data.dig('deployment', 'chatgpt_url'),
            'access_level' => config_data.dig('deployment', 'access_level'),
            'grade_levels' => config_data.dig('framework', 'grade_levels'),
            'difficulty' => config_data.dig('framework', 'difficulty'),
            'prerequisites' => config_data.dig('framework', 'prerequisites'),
            'critical_thinking_focus' => config_data.dig('framework', 'critical_thinking_focus'),
            'conversation_starters' => config_data['conversation_starters']
          }
          
          # Store in site data
          site.data['gpt_configs'][subject_name] = gpt_info
          
          Jekyll.logger.debug "GPT Config", "Loaded #{subject_name}: #{gpt_info['name']}"
          
        rescue => e
          Jekyll.logger.warn "GPT Config", "Failed to load #{config_file}: #{e.message}"
        end
      end
      
      Jekyll.logger.info "GPT Config", "Loaded #{site.data['gpt_configs'].size} GPT configurations"
    end
  end
end
