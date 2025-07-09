---
layout: default
title: "Questions"
description: "Search and discover questions across all subjects with our comprehensive question library"
permalink: /questions/
---

# 📝 Questions Library

Search and discover questions designed to promote critical thinking through AI-assisted learning.

## 🔍 Search Questions

<div class="card mb-4">
<div class="card-body">
<div class="row">
<div class="col-md-8">
<div class="input-group">
<input type="text" id="question-search" class="form-control" placeholder="Search questions by title, subject, tags, or content...">
<button class="btn btn-outline-primary" type="button" id="search-clear">
<i class="fas fa-times"></i>
</button>
</div>
</div>
<div class="col-md-4">
<select id="search-filters" class="form-select">
<option value="all">All Subjects</option>
<option value="algebra-1">Algebra 1</option>
<!-- Add more subjects as they are created -->
</select>
</div>
</div>
</div>
</div>

<div id="search-results-summary" class="mb-3"></div>

## 📚 Questions

<div class="table-responsive">
<table class="table table-hover" id="questions-table">
<thead>
<tr>
<th>Question</th>
<th>Subject</th>
<th>Difficulty</th>
<th>Grade Level</th>
<th>Time</th>
<th>Tags</th>
<th>Actions</th>
</tr>
</thead>
<tbody id="questions-tbody">
<!-- Questions will be populated here by JavaScript -->
</tbody>
</table>
</div>

<div id="no-results" class="text-center mt-5" style="display: none;">
<div class="card">
<div class="card-body">
<h4 class="text-muted">🔍 No questions found</h4>
<p class="text-muted">Try adjusting your search terms or filters.</p>
<button class="btn btn-primary" onclick="clearSearch()">Clear Search</button>
</div>
</div>
</div>

<script>
// Questions data - generated from Jekyll data
const questionsData = [
{% for question in site.data.algebra-1-questions %}
{
id: {{ forloop.index }},
title: {{ question.title | jsonify }},
description: {{ question.description | jsonify }},
url: {{ question.url | relative_url | jsonify }},
subject: "algebra-1",
subjectDisplay: "Algebra 1",
difficulty: {{ question.difficulty | jsonify }},
gradeLevel: {{ question.grade_level | jsonify }},
timeEstimate: {{ question.time_estimate | jsonify }},
tags: {{ question.tags | jsonify }},
chatgptLink: {{ question.chatgpt_link | jsonify }}
}{% unless forloop.last %},{% endunless %}
{% endfor %}
];

// Initialize the questions table
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('question-search');
    const searchClear = document.getElementById('search-clear');
    const searchFilters = document.getElementById('search-filters');
    const questionsTable = document.getElementById('questions-table');
    const questionsTableBody = document.getElementById('questions-tbody');
    const noResultsDiv = document.getElementById('no-results');
    const searchResultsSummary = document.getElementById('search-results-summary');
    
    let currentResults = questionsData;
    
    // Initialize table
    renderTable(questionsData);
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        performSearch();
    });
    
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchFilters.value = 'all';
        performSearch();
    });
    
    searchFilters.addEventListener('change', function() {
        performSearch();
    });
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const subjectFilter = searchFilters.value;
        
        let results = questionsData;
        
        // Apply text search
        if (query) {
            results = results.filter(question => {
                return question.title.toLowerCase().includes(query) ||
                       question.description.toLowerCase().includes(query) ||
                       question.subjectDisplay.toLowerCase().includes(query) ||
                       question.tags.some(tag => tag.toLowerCase().includes(query));
            });
        }
        
        // Apply subject filter
        if (subjectFilter !== 'all') {
            results = results.filter(question => question.subject === subjectFilter);
        }
        
        currentResults = results;
        renderTable(results);
        updateSearchSummary(results.length, query, subjectFilter);
    }
    
    function renderTable(questions) {
        if (questions.length === 0) {
            questionsTable.style.display = 'none';
            noResultsDiv.style.display = 'block';
            return;
        }
        
        questionsTable.style.display = 'table';
        noResultsDiv.style.display = 'none';
        
        const tbody = questions.map(question => `
            <tr>
                <td>
                    <strong><a href="${question.url}" class="text-decoration-none">${question.title}</a></strong>
                    <br>
                    <small class="text-muted">${question.description}</small>
                </td>
                <td><span class="badge bg-secondary">${question.subjectDisplay}</span></td>
                <td><span class="badge bg-${getDifficultyColor(question.difficulty)}">${question.difficulty}</span></td>
                <td>${question.gradeLevel}</td>
                <td>${question.timeEstimate}</td>
                <td>
                    ${question.tags.slice(0, 2).map(tag => `<span class="badge bg-light text-dark me-1">${tag.replace('-', ' ')}</span>`).join('')}
                    ${question.tags.length > 2 ? `<span class="badge bg-light text-dark">+${question.tags.length - 2}</span>` : ''}
                </td>
                <td>
                    <div class="btn-group-vertical btn-group-sm">
                        <a href="${question.url}" class="btn btn-outline-primary btn-sm">View</a>
                        ${question.chatgptLink ? `<a href="${question.chatgptLink}" class="btn btn-outline-success btn-sm" target="_blank">AI Tutor</a>` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
        
        questionsTableBody.innerHTML = tbody;
    }
    
    function getDifficultyColor(difficulty) {
        switch(difficulty) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'danger';
            default: return 'secondary';
        }
    }
    
    function updateSearchSummary(count, query, subjectFilter) {
        let summary = `Showing ${count} question${count !== 1 ? 's' : ''}`;
        
        if (query) {
            summary += ` matching "${query}"`;
        }
        
        if (subjectFilter !== 'all') {
            summary += ` in ${subjectFilter.replace('-', ' ')}`;
        }
        
        searchResultsSummary.innerHTML = count > 0 ? 
            `<p class="text-muted mb-0">${summary}</p>` : '';
    }
    
    window.clearSearch = function() {
        searchInput.value = '';
        searchFilters.value = 'all';
        performSearch();
    };
});
</script>

<style>
.table th {
    border-top: none;
    background-color: #f8f9fa;
    font-weight: 600;
}

.table td {
    vertical-align: middle;
}

.btn-group-vertical .btn {
    margin-bottom: 2px;
}

.btn-group-vertical .btn:last-child {
    margin-bottom: 0;
}

#question-search {
    font-size: 1.1rem;
    padding: 12px;
}

.search-highlight {
    background-color: #fff3cd;
    padding: 2px 4px;
    border-radius: 3px;
}
</style>
