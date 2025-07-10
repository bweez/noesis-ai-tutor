---
layout: default
title: "Questions"
description: "Search and discover questions across all subjects with our comprehensive question library"
permalink: /questions/
---

<!-- 
MAINTAINER NOTE: When adding new questions, update the questionsData array in the JavaScript section below.
Each new question should follow the same format with id, title, description, url, subject, etc.
This could be automated in the future with a Jekyll plugin or CLI command.
-->

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
<option value="biology">Biology</option>
<option value="chemistry">Chemistry</option>
<option value="geometry">Geometry</option>
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
// Questions data - manually maintained for now (can be automated later)
const questionsData = [
{
id: 1,
title: "Linear Equations: Solving for x",
description: "Learn to solve linear equations while understanding the mathematical reasoning behind each step",
url: "/ai-tutor-framework/noesis-docs/subjects/algebra-1/questions/linear-equations-solving/",
subject: "algebra-1",
subjectDisplay: "Algebra 1",
difficulty: "beginner",
gradeLevel: "8-10",
timeEstimate: "15-20 minutes",
tags: ["linear-equations", "inverse-operations", "algebraic-reasoning", "equation-solving"],
chatgptLink: "https://chatgpt.com/g/g-686c913bf2b0819191df0a0bdd6f3d97-noesis-algebra-1-tutor"
},
{
id: 2,
title: "Quadratic Functions: Finding Vertex Form",
description: "Explore quadratic functions and discover how to transform them into vertex form",
url: "/ai-tutor-framework/noesis-docs/subjects/algebra-1/questions/quadratic-vertex-form/",
subject: "algebra-1",
subjectDisplay: "Algebra 1",
difficulty: "intermediate",
gradeLevel: "9-11",
timeEstimate: "25-30 minutes",
tags: ["quadratic-functions", "vertex-form", "completing-square", "parabola"],
chatgptLink: "https://chatgpt.com/g/g-686c913bf2b0819191df0a0bdd6f3d97-noesis-algebra-1-tutor"
},
{
id: 3,
title: "Systems of Equations: Substitution vs Elimination",
description: "Explore different methods for solving systems and understand when each approach is most effective",
url: "/ai-tutor-framework/noesis-docs/subjects/algebra-1/questions/systems-equations-methods/",
subject: "algebra-1",
subjectDisplay: "Algebra 1",
difficulty: "intermediate",
gradeLevel: "9-10",
timeEstimate: "20-25 minutes",
tags: ["systems-equations", "substitution", "elimination", "algebraic-reasoning"],
chatgptLink: "https://chatgpt.com/g/g-686c913bf2b0819191df0a0bdd6f3d97-noesis-algebra-1-tutor"
},
{
id: 4,
title: "Cell Transport: Osmosis vs Active Transport",
description: "Investigate how cells control what enters and leaves through their membranes",
url: "/ai-tutor-framework/noesis-docs/subjects/biology/questions/cell-transport-mechanisms/",
subject: "biology",
subjectDisplay: "Biology",
difficulty: "intermediate",
gradeLevel: "9-12",
timeEstimate: "20-25 minutes",
tags: ["cell-biology", "membrane-transport", "osmosis", "active-transport", "homeostasis"],
chatgptLink: "https://chatgpt.com/g/g-686f13c03bd88191f40e4e9bcc6a7d85-noesis-biology-tutor"
},
{
id: 5,
title: "Genetics: Inheritance Patterns and Punnett Squares",
description: "Explore how traits are passed from parents to offspring through genetic analysis",
url: "/ai-tutor-framework/noesis-docs/subjects/biology/questions/inheritance-patterns/",
subject: "biology",
subjectDisplay: "Biology",
difficulty: "intermediate",
gradeLevel: "9-12",
timeEstimate: "25-30 minutes",
tags: ["genetics", "inheritance", "punnett-squares", "alleles", "phenotype", "genotype"],
chatgptLink: "https://chatgpt.com/g/g-686f13c03bd88191f40e4e9bcc6a7d85-noesis-biology-tutor"
},
{
id: 6,
title: "Ionic vs. Covalent Bonding: Understanding Chemical Bonds",
description: "Explore the fundamental differences between ionic and covalent bonds and predict bonding types based on electronegativity",
url: "/ai-tutor-framework/noesis-docs/subjects/chemistry/questions/ionic-vs-covalent-bonding/",
subject: "chemistry",
subjectDisplay: "Chemistry",
difficulty: "intermediate",
gradeLevel: "10-12",
timeEstimate: "20-25 minutes",
tags: ["chemical-bonding", "electronegativity", "ionic-bonds", "covalent-bonds", "molecular-structure"],
chatgptLink: "https://chatgpt.com/g/g-example-chemistry-tutor"
},
{
id: 7,
title: "Stoichiometry: Mole Ratios and Chemical Calculations",
description: "Master the quantitative relationships in chemical reactions through mole ratio calculations",
url: "/ai-tutor-framework/noesis-docs/subjects/chemistry/questions/stoichiometry-mole-ratios/",
subject: "chemistry",
subjectDisplay: "Chemistry",
difficulty: "intermediate",
gradeLevel: "10-12",
timeEstimate: "25-30 minutes",
tags: ["stoichiometry", "mole-ratios", "chemical-equations", "quantitative-analysis", "molar-mass"],
chatgptLink: "https://chatgpt.com/g/g-example-chemistry-tutor"
},
{
id: 8,
title: "Triangle Congruence: Proof Methods and Logic",
description: "Explore triangle congruence theorems and develop proof-writing skills",
url: "/ai-tutor-framework/noesis-docs/subjects/geometry/questions/triangle-congruence-proofs/",
subject: "geometry",
subjectDisplay: "Geometry",
difficulty: "intermediate",
gradeLevel: "9-11",
timeEstimate: "30-35 minutes",
tags: ["triangle-congruence", "proofs", "sss", "sas", "asa", "aas", "logical-reasoning"],
chatgptLink: "https://chatgpt.com/g/g-686f1535ffec8191bebec56ffa29a7f6-noesis-geometry-tutor"
},
{
id: 9,
title: "Area and Perimeter: Optimization Problems",
description: "Explore the relationship between area and perimeter in optimization contexts",
url: "/ai-tutor-framework/noesis-docs/subjects/geometry/questions/area-perimeter-optimization/",
subject: "geometry",
subjectDisplay: "Geometry",
difficulty: "advanced",
gradeLevel: "10-12",
timeEstimate: "35-40 minutes",
tags: ["area", "perimeter", "optimization", "rectangles", "calculus-preview", "problem-solving"],
chatgptLink: "https://chatgpt.com/g/g-686f1535ffec8191bebec56ffa29a7f6-noesis-geometry-tutor"
}
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
