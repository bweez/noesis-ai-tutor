module Jekyll
  module GPTFilters
    # Get GPT URL for a specific subject
    def gpt_url(subject_name)
      gpt_config = @context.registers[:site].data.dig('gpt_configs', subject_name)
      return nil unless gpt_config
      
      url = gpt_config['chatgpt_url']
      return nil if url.nil? || url.include?('[your-gpt-id]')
      
      url
    end
    
    # Get GPT name for a specific subject
    def gpt_name(subject_name)
      @context.registers[:site].data.dig('gpt_configs', subject_name, 'name')
    end
    
    # Get GPT description for a specific subject
    def gpt_description(subject_name)
      @context.registers[:site].data.dig('gpt_configs', subject_name, 'description')
    end
    
    # Get all GPT info for a subject
    def gpt_info(subject_name)
      @context.registers[:site].data.dig('gpt_configs', subject_name)
    end
    
    # Check if a GPT is configured and deployed for a subject
    def gpt_available?(subject_name)
      url = gpt_url(subject_name)
      !url.nil? && !url.empty? && !url.include?('[your-gpt-id]')
    end
    
    # Get conversation starters for a subject
    def gpt_conversation_starters(subject_name)
      @context.registers[:site].data.dig('gpt_configs', subject_name, 'conversation_starters')
    end
    
    # Extract subject name from a question or assignment URL
    def extract_subject_from_url(url)
      # Extract subject from URLs like "/subjects/algebra-1/questions/..."
      match = url.match(/\/subjects\/([^\/]+)\//)
      return match[1] if match
      
      # Extract from URLs like "/algebra-1/..."
      match = url.match(/\/([^\/]+)\//)
      return match[1] if match
      
      nil
    end
  end
end

Liquid::Template.register_filter(Jekyll::GPTFilters)
