/**
 * Unit tests for Jekyll integration utilities
 * Tests helper functions for Jekyll site generation and data processing
 */

describe('Jekyll Integration Utilities', () => {
  let jekyllUtils;

  beforeEach(() => {
    jekyllUtils = createJekyllUtils();
  });

  describe('Content Processing', () => {
    test('should clean Jekyll content for search indexing', () => {
      const content = `
        <h1>Title</h1>
        <p>This is a paragraph with <strong>bold</strong> text.</p>
        <div class="code-block">
          function test() {
            return true;
          }
        </div>
      `;

      const cleaned = jekyllUtils.cleanContent(content);
      expect(cleaned).toBe('Title This is a paragraph with bold text. function test() { return true; }');
    });

    test('should preserve code blocks but clean HTML', () => {
      const content = '<pre><code>console.log("hello");</code></pre>';
      const cleaned = jekyllUtils.cleanContent(content);
      expect(cleaned).toBe('console.log("hello");');
    });

    test('should handle empty or null content', () => {
      expect(jekyllUtils.cleanContent('')).toBe('');
      expect(jekyllUtils.cleanContent(null)).toBe('');
      expect(jekyllUtils.cleanContent(undefined)).toBe('');
    });
  });

  describe('URL Generation', () => {
    test('should generate proper Jekyll URLs', () => {
      expect(jekyllUtils.generateJekyllUrl('subjects', 'math')).toBe('/subjects/math/');
      expect(jekyllUtils.generateJekyllUrl('framework', 'questioning')).toBe('/framework/questioning/');
      expect(jekyllUtils.generateJekyllUrl('assignments', 'algebra-1')).toBe('/assignments/algebra-1/');
    });

    test('should handle special characters in URLs', () => {
      expect(jekyllUtils.generateJekyllUrl('subjects', 'computer-science')).toBe('/subjects/computer-science/');
      expect(jekyllUtils.generateJekyllUrl('framework', 'critical-thinking')).toBe('/framework/critical-thinking/');
    });

    test('should slugify complex names', () => {
      expect(jekyllUtils.slugify('Advanced Calculus & Derivatives')).toBe('advanced-calculus-derivatives');
      expect(jekyllUtils.slugify('C++ Programming Guide')).toBe('c-programming-guide');
      expect(jekyllUtils.slugify('Node.js Development')).toBe('nodejs-development');
    });
  });

  describe('Metadata Extraction', () => {
    test('should extract metadata from Jekyll front matter', () => {
      const frontMatter = {
        layout: 'subject',
        title: 'Algebra Fundamentals',
        description: 'Learn the basics of algebra',
        subject: 'mathematics',
        difficulty: 'beginner',
        tags: ['algebra', 'math', 'fundamentals'],
        last_modified_at: '2023-01-15'
      };

      const metadata = jekyllUtils.extractMetadata(frontMatter);
      
      expect(metadata.title).toBe('Algebra Fundamentals');
      expect(metadata.description).toBe('Learn the basics of algebra');
      expect(metadata.subject).toBe('mathematics');
      expect(metadata.difficulty).toBe('beginner');
      expect(metadata.tags).toEqual(['algebra', 'math', 'fundamentals']);
      expect(metadata.lastModified).toBe('2023-01-15');
    });

    test('should provide defaults for missing metadata', () => {
      const frontMatter = {
        title: 'Minimal Page'
      };

      const metadata = jekyllUtils.extractMetadata(frontMatter);
      
      expect(metadata.title).toBe('Minimal Page');
      expect(metadata.description).toBe('');
      expect(metadata.tags).toEqual([]);
      expect(metadata.subject).toBe('');
    });
  });

  describe('Collection Processing', () => {
    test('should process Jekyll collections correctly', () => {
      const collection = [
        {
          path: '_subjects/math.md',
          content: 'Math content',
          data: {
            title: 'Mathematics',
            subject: 'math',
            layout: 'subject'
          }
        },
        {
          path: '_framework/questioning.md',
          content: 'Questioning content',
          data: {
            title: 'Questioning Techniques',
            subject: 'framework',
            layout: 'framework'
          }
        }
      ];

      const processed = jekyllUtils.processCollection(collection, 'subjects');
      
      expect(processed).toHaveLength(2);
      expect(processed[0].id).toBe('subjects-math');
      expect(processed[0].title).toBe('Mathematics');
      expect(processed[0].type).toBe('subjects');
    });

    test('should filter out invalid collection items', () => {
      const collection = [
        {
          path: '_subjects/valid.md',
          content: 'Valid content',
          data: { title: 'Valid Item' }
        },
        {
          path: '_subjects/invalid.md',
          content: 'Invalid content',
          data: {} // Missing title
        }
      ];

      const processed = jekyllUtils.processCollection(collection, 'subjects');
      expect(processed).toHaveLength(1);
      expect(processed[0].title).toBe('Valid Item');
    });
  });

  describe('Search Index Generation', () => {
    test('should generate search index data', () => {
      const content = [
        {
          id: 'subject-math',
          title: 'Mathematics',
          content: 'Mathematical concepts and formulas',
          subject: 'math',
          tags: ['algebra', 'geometry'],
          url: '/subjects/math/'
        },
        {
          id: 'framework-questioning',
          title: 'Questioning Techniques',
          content: 'Effective questioning strategies for learning',
          subject: 'framework',
          tags: ['pedagogy', 'teaching'],
          url: '/framework/questioning/'
        }
      ];

      const searchIndex = jekyllUtils.generateSearchIndex(content);
      
      expect(searchIndex).toHaveLength(2);
      expect(searchIndex[0]).toMatchObject({
        id: 'subject-math',
        title: 'Mathematics',
        content: 'Mathematical concepts and formulas',
        subject: 'math',
        tags: 'algebra geometry',
        url: '/subjects/math/'
      });
    });

    test('should handle content with missing fields', () => {
      const content = [
        {
          id: 'minimal',
          title: 'Minimal Content'
        }
      ];

      const searchIndex = jekyllUtils.generateSearchIndex(content);
      
      expect(searchIndex).toHaveLength(1);
      expect(searchIndex[0].content).toBe('');
      expect(searchIndex[0].tags).toBe('');
      expect(searchIndex[0].subject).toBe('');
    });
  });

  describe('Performance Utilities', () => {
    test('should limit content length for search index', () => {
      const longContent = 'a'.repeat(1000);
      const limited = jekyllUtils.limitContentLength(longContent, 100);
      
      expect(limited.length).toBeLessThanOrEqual(103); // 100 + '...'
      expect(limited.endsWith('...')).toBe(true);
    });

    test('should not truncate short content', () => {
      const shortContent = 'Short content here';
      const limited = jekyllUtils.limitContentLength(shortContent, 100);
      
      expect(limited).toBe(shortContent);
    });

    test('should batch process large collections', () => {
      const largeCollection = Array.from({ length: 1000 }, (_, i) => ({
        id: `item-${i}`,
        title: `Item ${i}`,
        content: `Content for item ${i}`
      }));

      const batches = jekyllUtils.batchProcess(largeCollection, 100);
      
      expect(batches).toHaveLength(10);
      expect(batches[0]).toHaveLength(100);
      expect(batches[9]).toHaveLength(100);
    });
  });
});

// Helper function to create Jekyll utilities module
function createJekyllUtils() {
  function cleanContent(content) {
    if (!content) return '';
    
    // Remove HTML tags but preserve content
    return content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function generateJekyllUrl(collection, slug) {
    return `/${collection}/${slug}/`;
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  function extractMetadata(frontMatter) {
    return {
      title: frontMatter.title || '',
      description: frontMatter.description || '',
      subject: frontMatter.subject || '',
      difficulty: frontMatter.difficulty || '',
      tags: frontMatter.tags || [],
      lastModified: frontMatter.last_modified_at || '',
      layout: frontMatter.layout || 'default'
    };
  }

  function processCollection(collection, collectionName) {
    return collection
      .filter(item => item.data && item.data.title)
      .map(item => {
        const slug = item.path.split('/').pop().replace('.md', '');
        return {
          id: `${collectionName}-${slug}`,
          title: item.data.title,
          content: cleanContent(item.content),
          type: collectionName,
          url: generateJekyllUrl(collectionName, slug),
          ...extractMetadata(item.data)
        };
      });
  }

  function generateSearchIndex(content) {
    return content.map(item => ({
      id: item.id,
      title: item.title || '',
      content: item.content || '',
      subject: item.subject || '',
      tags: Array.isArray(item.tags) ? item.tags.join(' ') : (item.tags || ''),
      url: item.url || '#',
      type: item.type || 'page'
    }));
  }

  function limitContentLength(content, maxLength) {
    if (!content || content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  }

  function batchProcess(array, batchSize) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
      batches.push(array.slice(i, i + batchSize));
    }
    return batches;
  }

  return {
    cleanContent,
    generateJekyllUrl,
    slugify,
    extractMetadata,
    processCollection,
    generateSearchIndex,
    limitContentLength,
    batchProcess
  };
}
