module Jekyll
  class SubjectQuestionsGenerator < Generator
    safe true
    priority :low

    def generate(site)
      # Find all questions in subject subdirectories
      subject_dirs = Dir.glob(File.join(site.source, site.config['collections_dir'], '_subjects', '*')).select { |f| File.directory?(f) }
      
      subject_dirs.each do |subject_dir|
        subject_name = File.basename(subject_dir)
        
        # Process questions in this subject
        questions_dir = File.join(subject_dir, '_questions')
        if Dir.exist?(questions_dir)
          Dir.glob(File.join(questions_dir, '*.md')).each do |question_file|
            # Read the question file
            question_content = File.read(question_file)
            
            # Parse front matter
            if question_content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
              front_matter = YAML.load($1)
              content = question_content[($1.size + $2.size)..-1]
              
              # Create a new document for this question
              question_doc = Jekyll::Document.new(
                question_file,
                {
                  site: site,
                  collection: site.collections['subjects']
                }
              )
              
              # Set the URL to include the subject
              question_doc.data['permalink'] = "/subjects/#{subject_name}/questions/#{File.basename(question_file, '.md')}/"
              question_doc.data['subject'] = subject_name
              question_doc.data['layout'] = 'question'
              
              # Add to site pages
              site.pages << question_doc
            end
          end
        end
        
        # Process examples in this subject
        examples_dir = File.join(subject_dir, '_examples')
        if Dir.exist?(examples_dir)
          Dir.glob(File.join(examples_dir, '*.md')).each do |example_file|
            # Similar processing for examples
            example_content = File.read(example_file)
            
            if example_content =~ /\A(---\s*\n.*?\n?)^((---|\.\.\.)\s*$\n?)/m
              front_matter = YAML.load($1)
              content = example_content[($1.size + $2.size)..-1]
              
              example_doc = Jekyll::Document.new(
                example_file,
                {
                  site: site,
                  collection: site.collections['subjects']
                }
              )
              
              example_doc.data['permalink'] = "/subjects/#{subject_name}/examples/#{File.basename(example_file, '.md')}/"
              example_doc.data['subject'] = subject_name
              example_doc.data['layout'] = 'example'
              
              site.pages << example_doc
            end
          end
        end
      end
    end
  end
end
