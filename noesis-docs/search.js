---
layout: null
---

// Search functionality for AI Tutor Framework
(function() {
    'use strict';

    let searchIndex;
    let searchData = [];
    let globalPerformSearch = null;

    // Initialize search when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        buildSearchIndex();
        initializeSearch();
        initializeFilters();
    });

    // Build the search index
    function buildSearchIndex() {
        // Collect all searchable content
        {% assign searchable_content = "" | split: "" %}
        
        {% for subject in site.subjects %}
        {% assign searchable_content = searchable_content | push: subject %}
        {% endfor %}
        
        {% for framework_item in site.framework %}
        {% assign searchable_content = searchable_content | push: framework_item %}
        {% endfor %}
        
        {% for assignment in site.assignments %}
        {% assign searchable_content = searchable_content | push: assignment %}
        {% endfor %}
        
        {% for page in site.pages %}
        {% if page.title %}
        {% assign searchable_content = searchable_content | push: page %}
        {% endif %}
        {% endfor %}

        searchData = [
            {% for item in searchable_content %}
            {
                id: {{ forloop.index }},
                title: {{ item.title | jsonify }},
                content: {{ item.content | strip_html | truncate: 500 | jsonify }},
                url: {{ item.url | relative_url | jsonify }},
                type: "{{ item.collection }}",
                difficulty: {{ item.difficulty | jsonify }},
                subject: {{ item.subject | jsonify }},
                tags: {{ item.tags | jsonify }},
                grade_level: {{ item.grade_level | jsonify }}
            }{% unless forloop.last %},{% endunless %}
            {% endfor %}
        ];

        // Build Lunr index
        searchIndex = lunr(function() {
            this.ref('id');
            this.field('title', { boost: 10 });
            this.field('content');
            this.field('subject', { boost: 5 });
            this.field('tags', { boost: 3 });

            for (let i = 0; i < searchData.length; i++) {
                this.add(searchData[i]);
            }
        });
    }

    // Initialize search functionality
    function initializeSearch() {
        const searchInput = document.getElementById('search-input');
        const searchButton = document.getElementById('search-button');
        const searchModal = new bootstrap.Modal(document.getElementById('searchModal'));

        function performSearch() {
            const query = searchInput.value.trim();
            if (query.length < 2) {
                alert('Please enter at least 2 characters to search.');
                return;
            }

            const results = searchIndex.search(query);
            displaySearchResults(results, query);
            searchModal.show();
        }

        // Store reference for global access
        globalPerformSearch = performSearch;

        if (searchInput && searchButton) {
            searchButton.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
        }
    }

    // Display search results
    function displaySearchResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="text-muted">No results found for "' + escapeHtml(query) + '"</p>';
            return;
        }

        let html = '<p class="mb-3">Found ' + results.length + ' result(s) for "' + escapeHtml(query) + '"</p>';
        
        results.forEach(function(result) {
            const item = searchData[result.ref - 1];
            html += `
                <div class="search-result-item">
                    <h5><a href="${item.url}" class="text-decoration-none">${highlightSearchTerms(item.title, query)}</a></h5>
                    <p class="text-muted mb-2">
                        <span class="badge bg-secondary me-2">${item.type}</span>
                        ${item.difficulty ? '<span class="badge bg-primary me-2">' + item.difficulty + '</span>' : ''}
                        ${item.subject ? '<span class="badge bg-info me-2">' + item.subject + '</span>' : ''}
                    </p>
                    <p class="mb-0">${highlightSearchTerms(item.content, query)}</p>
                </div>
            `;
        });

        resultsContainer.innerHTML = html;
    }

    // Highlight search terms in results
    function highlightSearchTerms(text, query) {
        const regex = new RegExp('(' + escapeRegex(query) + ')', 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Initialize filter functionality
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const filterableItems = document.querySelectorAll('.filterable-item');

        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filterType = this.dataset.filter;
                const filterValue = this.dataset.value;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter items
                filterItems(filterableItems, filterType, filterValue);
            });
        });
    }

    // Filter items based on criteria
    function filterItems(items, filterType, filterValue) {
        items.forEach(function(item) {
            const shouldShow = filterValue === 'all' || 
                             item.dataset[filterType] === filterValue ||
                             (item.dataset.tags && item.dataset.tags.includes(filterValue));

            if (shouldShow) {
                item.style.display = '';
                item.classList.add('fade-in');
            } else {
                item.style.display = 'none';
                item.classList.remove('fade-in');
            }
        });
    }

    // Tag cloud functionality
    function initializeTagCloud() {
        const tagButtons = document.querySelectorAll('.tag-filter');
        
        tagButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const tag = this.dataset.tag;
                
                // Toggle active state
                this.classList.toggle('active');
                
                // Get all active tags
                const activeTags = Array.from(document.querySelectorAll('.tag-filter.active'))
                                       .map(btn => btn.dataset.tag);
                
                // Filter content by active tags
                filterByTags(activeTags);
            });
        });
    }

    // Filter content by tags
    function filterByTags(activeTags) {
        const items = document.querySelectorAll('.filterable-item');
        
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

    // Utility functions
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // Expose functions globally for other scripts
    window.AITutorFramework = {
        search: () => globalPerformSearch && globalPerformSearch(),
        filterItems: filterItems,
        initializeTagCloud: initializeTagCloud
    };

    // Initialize tag cloud when DOM is ready
    document.addEventListener('DOMContentLoaded', initializeTagCloud);
})();
