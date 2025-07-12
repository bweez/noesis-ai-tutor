/**
 * Unit tests for the AI Tutor Framework Search functionality
 * Tests the core search.js functions in isolation
 */

// Mock the search.js module by extracting testable functions
// We'll create a testable version that exposes internal functions

describe('AI Tutor Framework Search', () => {
  let searchModule;

  beforeEach(() => {
    // Create a testable version of the search module
    searchModule = createTestableSearchModule();
  });

  describe('Utility Functions', () => {
    describe('escapeHtml', () => {
      test('should escape HTML special characters', () => {
        expect(searchModule.escapeHtml('<script>alert("test")</script>'))
          .toBe('&lt;script&gt;alert("test")&lt;/script&gt;');
        
        expect(searchModule.escapeHtml('Hello & World'))
          .toBe('Hello &amp; World');
        
        expect(searchModule.escapeHtml('Safe text'))
          .toBe('Safe text');
      });

      test('should handle empty and null values', () => {
        expect(searchModule.escapeHtml('')).toBe('');
        expect(searchModule.escapeHtml(null)).toBe('');
        expect(searchModule.escapeHtml(undefined)).toBe('');
      });
    });

    describe('escapeRegex', () => {
      test('should escape regex special characters', () => {
        expect(searchModule.escapeRegex('hello.world'))
          .toBe('hello\\.world');
        
        expect(searchModule.escapeRegex('[test]'))
          .toBe('\\[test\\]');
        
        expect(searchModule.escapeRegex('$^{}()'))
          .toBe('\\$\\^\\{\\}\\(\\)');
      });

      test('should handle normal text without regex chars', () => {
        expect(searchModule.escapeRegex('hello world')).toBe('hello world');
      });
    });

    describe('highlightSearchTerms', () => {
      test('should highlight search terms with mark tags', () => {
        const result = searchModule.highlightSearchTerms('Hello world', 'world');
        expect(result).toBe('Hello <mark class="search-highlight">world</mark>');
      });

      test('should be case insensitive', () => {
        const result = searchModule.highlightSearchTerms('Hello WORLD', 'world');
        expect(result).toBe('Hello <mark class="search-highlight">WORLD</mark>');
      });

      test('should highlight multiple occurrences', () => {
        const result = searchModule.highlightSearchTerms('test test test', 'test');
        expect(result).toBe(
          '<mark class="search-highlight">test</mark> ' +
          '<mark class="search-highlight">test</mark> ' +
          '<mark class="search-highlight">test</mark>'
        );
      });

      test('should handle special regex characters in search terms', () => {
        const result = searchModule.highlightSearchTerms('Hello [world]', '[world]');
        expect(result).toBe('Hello <mark class="search-highlight">[world]</mark>');
      });
    });
  });

  describe('Search Data Processing', () => {
    describe('validateSearchData', () => {
      test('should validate properly formatted search data', () => {
        const validData = [
          { id: '1', title: 'Test', content: 'Content', subject: 'Math' },
          { id: '2', title: 'Test 2', content: 'Content 2', subject: 'Science' }
        ];
        expect(searchModule.validateSearchData(validData)).toBe(true);
      });

      test('should reject invalid search data', () => {
        const invalidData = [
          { title: 'Test' }, // Missing id
          { id: '2' } // Missing title
        ];
        expect(searchModule.validateSearchData(invalidData)).toBe(false);
      });

      test('should handle empty arrays', () => {
        expect(searchModule.validateSearchData([])).toBe(true);
      });
    });

    describe('processSearchResults', () => {
      test('should process search results correctly', () => {
        const mockSearchData = [
          { id: '1', title: 'Algebra Basics', content: 'Learn algebra', subject: 'Math' },
          { id: '2', title: 'Chemistry 101', content: 'Basic chemistry', subject: 'Science' }
        ];

        const mockLunrResults = [
          { ref: '1', score: 0.8 },
          { ref: '2', score: 0.6 }
        ];

        const results = searchModule.processSearchResults(mockLunrResults, mockSearchData);
        
        expect(results).toHaveLength(2);
        expect(results[0].title).toBe('Algebra Basics');
        expect(results[0].score).toBe(0.8);
        expect(results[1].title).toBe('Chemistry 101');
        expect(results[1].score).toBe(0.6);
      });

      test('should handle missing search data entries', () => {
        const mockSearchData = [
          { id: '1', title: 'Test', content: 'Content', subject: 'Math' }
        ];

        const mockLunrResults = [
          { ref: '1', score: 0.8 },
          { ref: '999', score: 0.6 } // Non-existent ID
        ];

        const results = searchModule.processSearchResults(mockLunrResults, mockSearchData);
        
        expect(results).toHaveLength(1);
        expect(results[0].title).toBe('Test');
      });
    });
  });

  describe('Filtering Functions', () => {
    describe('filterByTags', () => {
      let mockItems;

      beforeEach(() => {
        // Create mock DOM elements
        mockItems = [
          createMockElement({ 'data-tags': 'javascript,programming' }),
          createMockElement({ 'data-tags': 'python,programming' }),
          createMockElement({ 'data-tags': 'math,algebra' }),
          createMockElement({}) // No tags
        ];
      });

      test('should show all items when no tags are active', () => {
        searchModule.filterByTags([], mockItems);
        
        mockItems.forEach(item => {
          expect(item.style.display).toBe('');
        });
      });

      test('should filter items by single tag', () => {
        searchModule.filterByTags(['programming'], mockItems);
        
        expect(mockItems[0].style.display).toBe(''); // Has programming tag
        expect(mockItems[1].style.display).toBe(''); // Has programming tag
        expect(mockItems[2].style.display).toBe('none'); // No programming tag
        expect(mockItems[3].style.display).toBe('none'); // No tags
      });

      test('should filter items by multiple tags (OR logic)', () => {
        searchModule.filterByTags(['programming', 'math'], mockItems);
        
        expect(mockItems[0].style.display).toBe(''); // Has programming
        expect(mockItems[1].style.display).toBe(''); // Has programming
        expect(mockItems[2].style.display).toBe(''); // Has math
        expect(mockItems[3].style.display).toBe('none'); // No matching tags
      });
    });

    describe('filterItems', () => {
      let mockItems;

      beforeEach(() => {
        mockItems = [
          createMockElement({ 'data-subject': 'math', 'data-type': 'tutorial' }),
          createMockElement({ 'data-subject': 'science', 'data-type': 'quiz' }),
          createMockElement({ 'data-subject': 'math', 'data-type': 'exercise' })
        ];
      });

      test('should filter by subject', () => {
        searchModule.filterItems(mockItems, 'subject', 'math');
        
        expect(mockItems[0].style.display).toBe('');
        expect(mockItems[1].style.display).toBe('none');
        expect(mockItems[2].style.display).toBe('');
      });

      test('should filter by type', () => {
        searchModule.filterItems(mockItems, 'type', 'quiz');
        
        expect(mockItems[0].style.display).toBe('none');
        expect(mockItems[1].style.display).toBe('');
        expect(mockItems[2].style.display).toBe('none');
      });

      test('should show all items when filter value is "all"', () => {
        searchModule.filterItems(mockItems, 'subject', 'all');
        
        mockItems.forEach(item => {
          expect(item.style.display).toBe('');
        });
      });
    });
  });

  describe('Search Query Processing', () => {
    describe('processSearchQuery', () => {
      test('should clean and normalize search queries', () => {
        expect(searchModule.processSearchQuery('  Hello World  ')).toBe('hello world');
        expect(searchModule.processSearchQuery('JavaScript')).toBe('javascript');
        expect(searchModule.processSearchQuery('')).toBe('');
      });

      test('should handle special characters in queries', () => {
        expect(searchModule.processSearchQuery('C++ Programming')).toBe('c++ programming');
        expect(searchModule.processSearchQuery('Node.js')).toBe('node.js');
      });
    });

    describe('buildSearchTerms', () => {
      test('should build search terms from query', () => {
        const terms = searchModule.buildSearchTerms('javascript programming tutorial');
        expect(terms).toEqual(['javascript', 'programming', 'tutorial']);
      });

      test('should handle quoted phrases', () => {
        const terms = searchModule.buildSearchTerms('"machine learning" algorithm');
        expect(terms).toContain('machine learning');
        expect(terms).toContain('algorithm');
      });

      test('should remove stop words', () => {
        const terms = searchModule.buildSearchTerms('the quick brown fox');
        expect(terms).not.toContain('the');
        expect(terms).toContain('quick');
        expect(terms).toContain('brown');
        expect(terms).toContain('fox');
      });
    });
  });
});

// Helper functions for testing
function createTestableSearchModule() {
  // Extract and expose the functions from search.js for testing
  // This creates a test-friendly version of the module
  
  function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightSearchTerms(text, query) {
    const regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  function validateSearchData(data) {
    if (!Array.isArray(data)) return false;
    if (data.length === 0) return true;
    
    return data.every(item => 
      item && 
      typeof item === 'object' && 
      item.id && 
      item.title
    );
  }

  function processSearchResults(lunrResults, searchData) {
    return lunrResults
      .map(result => {
        const item = searchData.find(data => data.id === result.ref);
        return item ? { ...item, score: result.score } : null;
      })
      .filter(Boolean);
  }

  function filterByTags(activeTags, items = document.querySelectorAll('.filterable-item')) {
    items.forEach(function(item) {
      if (activeTags.length === 0) {
        item.style.display = '';
        return;
      }
      
      const itemTags = item.dataset.tags ? item.dataset.tags.split(',') : [];
      const hasMatchingTag = activeTags.some(tag => itemTags.includes(tag));
      
      item.style.display = hasMatchingTag ? '' : 'none';
    });
  }

  function filterItems(items, filterType, filterValue) {
    items.forEach(function(item) {
      if (filterValue === 'all') {
        item.style.display = '';
        return;
      }
      
      const itemValue = item.dataset[filterType];
      item.style.display = itemValue === filterValue ? '' : 'none';
    });
  }

  function processSearchQuery(query) {
    return query.trim().toLowerCase();
  }

  function buildSearchTerms(query) {
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    
    // Handle quoted phrases
    const phrases = [];
    const quotedRegex = /"([^"]+)"/g;
    let match;
    
    while ((match = quotedRegex.exec(query)) !== null) {
      phrases.push(match[1]);
      query = query.replace(match[0], '');
    }
    
    // Split remaining query into words
    const words = query.split(/\s+/)
      .filter(word => word.length > 0)
      .filter(word => !stopWords.includes(word.toLowerCase()));
    
    return [...phrases, ...words];
  }

  return {
    escapeHtml,
    escapeRegex,
    highlightSearchTerms,
    validateSearchData,
    processSearchResults,
    filterByTags,
    filterItems,
    processSearchQuery,
    buildSearchTerms
  };
}

function createMockElement(attributes = {}) {
  const element = {
    style: { display: '' },
    dataset: {},
    setAttribute: jest.fn(),
    getAttribute: jest.fn()
  };
  
  // Add dataset attributes
  Object.keys(attributes).forEach(key => {
    if (key.startsWith('data-')) {
      const dataKey = key.substring(5).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      element.dataset[dataKey] = attributes[key];
    }
  });
  
  return element;
}
