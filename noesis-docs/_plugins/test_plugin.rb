module Jekyll
  # Test plugin to verify Jekyll is loading plugins
  class TestGenerator < Generator
    safe true
    priority :high

    def generate(site)
      puts "🔍 TEST PLUGIN LOADED - Jekyll is processing plugins!"
      site.data['test_plugin'] = { 'loaded' => true, 'timestamp' => Time.now.to_s }
    end
  end
end
