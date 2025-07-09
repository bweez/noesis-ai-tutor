---
layout: default
title: "Framework Documentation"
description: "Complete documentation and resources for implementing the Noesis AI Tutor Framework in your classroom"
permalink: /framework/
---

# 🛠️ Framework Documentation

Everything you need to implement and customize the Noesis AI Tutor Framework for your educational needs.

## Quick Start Guides

<div class="row">
<div class="col-md-4 mb-3">
<div class="card bg-light h-100">
<div class="card-body text-center">
<i class="fas fa-rocket fa-2x text-primary mb-3"></i>
<h5>Getting Started</h5>
<p class="text-muted">Set up your first AI tutor in minutes</p>
<a href="{{ '/framework/bot-template/' | relative_url }}" class="btn btn-outline-primary">Start Here</a>
</div>
</div>
</div>
<div class="col-md-4 mb-3">
<div class="card bg-light h-100">
<div class="card-body text-center">
<i class="fas fa-chalkboard-teacher fa-2x text-success mb-3"></i>
<h5>For Teachers</h5>
<p class="text-muted">Implementation guide and best practices</p>
<a href="{{ '/framework/conversation-guidelines/' | relative_url }}" class="btn btn-outline-success">Learn More</a>
</div>
</div>
</div>
<div class="col-md-4 mb-3">
<div class="card bg-light h-100">
<div class="card-body text-center">
<i class="fas fa-question-circle fa-2x text-info mb-3"></i>
<h5>Question Design</h5>
<p class="text-muted">Create engaging questions that promote critical thinking</p>
<a href="{{ '/framework/question-format/' | relative_url }}" class="btn btn-outline-info">Get Started</a>
</div>
</div>
</div>
</div>

## Framework Components

{% assign framework_docs = site.framework | sort: 'order' %}
{% assign setup_docs = framework_docs | where: "category", "setup" %}
{% assign guide_docs = framework_docs | where: "category", "guides" %}
{% assign tool_docs = framework_docs | where: "category", "tools" %}

{% if setup_docs.size > 0 %}
## Setup & Configuration
{% for doc in setup_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{{ doc.description }}

<a href="{{ doc.url | relative_url }}" class="btn btn-primary btn-sm">Read Documentation →</a>
{% endfor %}
{% endif %}

{% if guide_docs.size > 0 %}
## Implementation Guides  
{% for doc in guide_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{{ doc.description }}

<a href="{{ doc.url | relative_url }}" class="btn btn-primary btn-sm">Read Guide →</a>
{% endfor %}
{% endif %}

{% if tool_docs.size > 0 %}
## Assessment Tools
{% for doc in tool_docs %}
### [{{ doc.title }}]({{ doc.url | relative_url }})
{{ doc.description }}

<a href="{{ doc.url | relative_url }}" class="btn btn-primary btn-sm">View Tool →</a>
{% endfor %}
{% endif %}

## All Framework Documentation

{% for doc in framework_docs %}
<div class="card mb-3">
<div class="card-header">
<div class="d-flex justify-content-between align-items-center">
<h6 class="mb-0">
<a href="{{ doc.url | relative_url }}" class="text-decoration-none">{{ doc.title }}</a>
</h6>
{% if doc.category %}
<span class="badge bg-secondary">{{ doc.category | capitalize }}</span>
{% endif %}
</div>
</div>
<div class="card-body">
{% if doc.description %}
<p>{{ doc.description }}</p>
{% else %}
<p>{{ doc.content | strip_html | truncate: 150 }}</p>
{% endif %}

<a href="{{ doc.url | relative_url }}" class="btn btn-primary btn-sm">Read Documentation</a>
</div>
</div>
{% endfor %}

## Framework Philosophy

The Noesis AI Tutor Framework is built on these core principles:

### 🧠 Critical Thinking First
- Questions designed to promote deep thinking, not quick answers
- AI tutors guide discovery rather than provide solutions
- Assessment focuses on thinking process, not just correct answers

### 📝 Markdown-Driven
- All content created and managed through simple markdown files
- Minimal technical overhead for educators
- Version control and collaboration through standard tools

### 🎯 Subject-Specific Design
- Each subject area has tailored approaches and methodologies
- Content organized by difficulty levels and learning objectives
- Flexible framework adaptable to different educational contexts

### 👥 Community-Centered
- Open source with clear contribution guidelines
- Collaborative development between educators
- Shared knowledge base that improves over time

### 🔧 Teacher-Friendly
- Designed by educators for educators
- Clear assessment rubrics and evaluation tools
- Minimal setup time with maximum educational impact

## Getting Involved

### For Educators
- **Start Using** - Try the framework with your students
- **Share Feedback** - Let us know what works and what doesn't
- **Contribute Content** - Add questions, subjects, or examples
- **Join Community** - Connect with other educators using the framework

### For Developers
- **Improve Platform** - Enhance the technical infrastructure
- **Add Features** - Build tools that help educators
- **Documentation** - Help make the framework more accessible
- **Testing** - Ensure everything works across different environments

### For Researchers
- **Study Effectiveness** - Research the impact on student learning
- **Share Findings** - Contribute to educational research
- **Validate Methods** - Help prove the framework's educational value
- **Expand Applications** - Explore new use cases and contexts

<a href="{{ '/subjects/' | relative_url }}" class="btn btn-primary">View All Subjects</a>
<a href="{{ '/questions/' | relative_url }}" class="btn btn-secondary">Browse Questions</a>
