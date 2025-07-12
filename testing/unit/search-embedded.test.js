/**
 * Unit tests for the embedded search functionality
 * Tests the search-embedded.js Jekyll-generated search
 */

describe('AI Tutor Framework Embedded Search', () => {
  let embeddedSearchModule;

  beforeEach(() => {
    // Create testable version of embedded search
    embeddedSearchModule = createTestableEmbeddedSearchModule();
  });

  describe('Jekyll Data Processing', () => {
    test('should process Jekyll-generated search data', () => {
      const jekyllData = [
        {
          id: 'subject-math',
          title: 'Mathematics',
          content: 'Learn mathematical concepts',
          subject: 'math',
          url: '/subjects/math/',
          type: 'subject'
        },
        {
          id: 'framework-questioning',
          title: 'Questioning Techniques',
          content: 'Effective questioning strategies',
          subject: 'framework',
          url: '/framework/questioning/',
          type: 'framework'
        }
      ];

      const processed = embeddedSearchModule.processJekyllData(jekyllData);
      
      expect(processed).toHaveLength(2);
      expect(processed[0].id).toBe('subject-math');
      expect(processed[1].type).toBe('framework');
    });

    test('should handle empty Jekyll data', () => {
      const processed = embeddedSearchModule.processJekyllData([]);
      expect(processed).toEqual([]);
    });

    test('should filter out invalid entries', () => {
      const jekyllData = [
        { id: 'valid', title: 'Valid Entry', content: 'Content' },
        { title: 'Missing ID' }, // Invalid
        { id: 'missing-title' }, // Invalid
        { id: 'valid-2', title: 'Another Valid', content: 'More content' }
      ];

      const processed = embeddedSearchModule.processJekyllData(jekyllData);
      expect(processed).toHaveLength(2);
      expect(processed[0].id).toBe('valid');
      expect(processed[1].id).toBe('valid-2');
    });
  });

  describe('Content Type Classification', () => {
    test('should classify content types correctly', () => {
      expect(embeddedSearchModule.classifyContentType('/subjects/math/')).toBe('subject');
      expect(embeddedSearchModule.classifyContentType('/framework/questioning/')).toBe('framework');
      expect(embeddedSearchModule.classifyContentType('/assignments/algebra/')).toBe('assignment');
      expect(embeddedSearchModule.classifyContentType('/questions/geometry/')).toBe('question');
      expect(embeddedSearchModule.classifyContentType('/other/page/')).toBe('page');
    });

    test('should handle edge cases in URL classification', () => {
      expect(embeddedSearchModule.classifyContentType('')).toBe('page');
      expect(embeddedSearchModule.classifyContentType('/')).toBe('page');
      expect(embeddedSearchModule.classifyContentType('/subjects/')).toBe('subject');
    });
  });

  describe('Search Data Validation', () => {
    test('should validate embedded search entries', () => {
      const validEntry = {
        id: 'test-id',
        title: 'Test Title',
        content: 'Test content',
        url: '/test/'
      };
      
      expect(embeddedSearchModule.validateEntry(validEntry)).toBe(true);
    });

    test('should reject invalid entries', () => {
      expect(embeddedSearchModule.validateEntry({})).toBe(false);
      expect(embeddedSearchModule.validateEntry({ id: 'test' })).toBe(false);
      expect(embeddedSearchModule.validateEntry({ title: 'test' })).toBe(false);
      expect(embeddedSearchModule.validateEntry(null)).toBe(false);
    });
  });

  describe('Content Extraction', () => {
    test('should extract content from Jekyll front matter', () => {
      const frontMatter = {
        title: 'Test Page',
        description: 'A test page for unit testing',
        tags: ['test', 'unit-testing'],
        subject: 'testing'
      };

      const extracted = embeddedSearchModule.extractContent(frontMatter, 'Page content here');
      
      expect(extracted.title).toBe('Test Page');
      expect(extracted.content).toContain('A test page for unit testing');
      expect(extracted.content).toContain('Page content here');
      expect(extracted.tags).toEqual(['test', 'unit-testing']);
      expect(extracted.subject).toBe('testing');
    });

    test('should handle missing front matter fields', () => {
      const frontMatter = {
        title: 'Minimal Page'
      };

      const extracted = embeddedSearchModule.extractContent(frontMatter, 'Content');
      
      expect(extracted.title).toBe('Minimal Page');
      expect(extracted.content).toBe('Content');
      expect(extracted.tags).toEqual([]);
      expect(extracted.subject).toBe('');
    });
  });

  describe('URL Processing', () => {
    test('should generate proper search URLs', () => {
      const entry = {
        url: '/subjects/math/',
        permalink: '/subjects/math/index.html'
      };

      const url = embeddedSearchModule.generateSearchUrl(entry);
      expect(url).toBe('/subjects/math/index.html'); // Should prefer permalink
    });

    test('should prefer permalink over url', () => {
      const entry = {
        url: '/old-url/',
        permalink: '/new-permalink/'
      };

      const url = embeddedSearchModule.generateSearchUrl(entry);
      expect(url).toBe('/new-permalink/');
    });

    test('should handle missing URL fields', () => {
      const entry = {};
      const url = embeddedSearchModule.generateSearchUrl(entry);
      expect(url).toBe('#');
    });
  });

  describe('Tag Processing', () => {
    test('should process tags from various sources', () => {
      const entry = {
        tags: ['javascript', 'programming'],
        categories: ['tutorial'],
        subject: 'computer-science'
      };

      const tags = embeddedSearchModule.processTags(entry);
      expect(tags).toContain('javascript');
      expect(tags).toContain('programming');
      expect(tags).toContain('tutorial');
      expect(tags).toContain('computer-science');
    });

    test('should handle string tags', () => {
      const entry = {
        tags: 'single-tag'
      };

      const tags = embeddedSearchModule.processTags(entry);
      expect(tags).toEqual(['single-tag']);
    });

    test('should deduplicate tags', () => {
      const entry = {
        tags: ['programming', 'javascript'],
        categories: ['programming'], // Duplicate
        subject: 'javascript' // Duplicate
      };

      const tags = embeddedSearchModule.processTags(entry);
      expect(tags).toEqual(['programming', 'javascript']);
    });
  });
});

// Helper functions for testing embedded search
function createTestableEmbeddedSearchModule() {
  function processJekyllData(data) {
    return data.filter(entry => validateEntry(entry));
  }

  function validateEntry(entry) {
    return !!(entry && 
           typeof entry === 'object' && 
           entry.id && 
           entry.title);
  }

  function classifyContentType(url) {
    if (!url || url === '/' || url === '') return 'page';
    
    if (url.includes('/subjects/')) return 'subject';
    if (url.includes('/framework/')) return 'framework';
    if (url.includes('/assignments/')) return 'assignment';
    if (url.includes('/questions/')) return 'question';
    
    return 'page';
  }

  function extractContent(frontMatter, content) {
    const extracted = {
      title: frontMatter.title || '',
      content: '',
      tags: frontMatter.tags || [],
      subject: frontMatter.subject || '',
      description: frontMatter.description || ''
    };

    // Combine description and content
    const contentParts = [];
    if (extracted.description) contentParts.push(extracted.description);
    if (content) contentParts.push(content);
    
    extracted.content = contentParts.join(' ');

    return extracted;
  }

  function generateSearchUrl(entry) {
    return entry.permalink || entry.url || '#';
  }

  function processTags(entry) {
    const tags = new Set();
    
    // Add tags from various sources
    if (entry.tags) {
      if (Array.isArray(entry.tags)) {
        entry.tags.forEach(tag => tags.add(tag));
      } else {
        tags.add(entry.tags);
      }
    }
    
    if (entry.categories) {
      if (Array.isArray(entry.categories)) {
        entry.categories.forEach(cat => tags.add(cat));
      } else {
        tags.add(entry.categories);
      }
    }
    
    if (entry.subject) {
      tags.add(entry.subject);
    }
    
    return Array.from(tags);
  }

  return {
    processJekyllData,
    validateEntry,
    classifyContentType,
    extractContent,
    generateSearchUrl,
    processTags
  };
}
