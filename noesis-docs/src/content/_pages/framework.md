---
layout: framework
title: "Framework Documentation"
description: "Complete documentation and resources for implementing the Noesis AI Tutor Framework in your classroom"
permalink: /framework/
---

{% assign framework_docs = site.framework | sort: 'order' %}
{% assign setup_docs = framework_docs | where: "category", "setup" %}
{% assign guide_docs = framework_docs | where: "category", "guides" %}
{% assign tool_docs = framework_docs | where: "category", "tools" %}

{% if setup_docs.size > 0 %}
### ⚙️ Setup & Configuration

<div class="framework-components-grid">
{% for doc in setup_docs %}
<div class="framework-component">
    <h4><a href="{{ doc.url | relative_url }}">{{ doc.title }}</a></h4>
    <p>{{ doc.description }}</p>
    <a href="{{ doc.url | relative_url }}" class="btn btn-primary">
        <i class="fas fa-cog"></i> Read Documentation
    </a>
</div>
{% endfor %}
</div>
{% endif %}

{% if guide_docs.size > 0 %}

### 📚 Technical Documentation

<div class="framework-components-grid">
    <div class="framework-component">
        <h4><a href="https://github.com/bweez/noesis-ai-tutor"></a>GitHub Code Repository</h4>
        <p>GitHub is a code hosting platform for version control and collaboration.</p>
        <a href="https://github.com/bweez/noesis-ai-tutor" class="btn btn-primary">
            <i class="fas fa-code-fork"></i> View on GitHub
        </a>
    </div>
    <div class="framework-component">
        <h4><a href="https://github.com/bweez/noesis-ai-tutor/blob/main/CONTRIBUTING.md"></a>Code Contribution Guidelines</h4>
        <p>Guidelines on how to submit requests for changes or code changes themselves.</p>
        <a href="https://github.com/bweez/noesis-ai-tutor/blob/main/CONTRIBUTING.md" class="btn btn-primary">
            <i class="fas fa-code"></i> View on GitHub
        </a>
    </div>
</div>


### 📖 Implementation Guides

<div class="framework-components-grid">
{% for doc in guide_docs %}
<div class="framework-component">
    <h4><a href="{{ doc.url | relative_url }}">{{ doc.title }}</a></h4>
    <p>{{ doc.description }}</p>
    <a href="{{ doc.url | relative_url }}" class="btn btn-primary">
        <i class="fas fa-book"></i> Read Guide
    </a>
</div>
{% endfor %}
</div>
{% endif %}

{% if tool_docs.size > 0 %}
### 📊 Assessment Tools

<div class="framework-components-grid">
{% for doc in tool_docs %}
<div class="framework-component">
    <h4><a href="{{ doc.url | relative_url }}">{{ doc.title }}</a></h4>
    <p>{{ doc.description }}</p>
    <a href="{{ doc.url | relative_url }}" class="btn btn-primary">
        <i class="fas fa-tools"></i> View Tool
    </a>
</div>
{% endfor %}
</div>
{% endif %}

---

## 🎯 Framework Philosophy

<div class="framework-philosophy">

<h3 data-icon="🧠">Critical Thinking First</h3>
<ul>
<li>Questions designed to promote deep thinking, not quick answers</li>
<li>AI tutors guide discovery rather than provide solutions</li>
<li>Assessment focuses on thinking process, not just correct answers</li>
</ul>

<h3 data-icon="📝">Markdown-Driven</h3>
<ul>
<li>All content created and managed through simple markdown files</li>
<li>Minimal technical overhead for educators</li>
<li>Version control and collaboration through standard tools</li>
</ul>

<h3 data-icon="🎯">Subject-Specific Design</h3>
<ul>
<li>Each subject area has tailored approaches and methodologies</li>
<li>Content organized by difficulty levels and learning objectives</li>
<li>Flexible framework adaptable to different educational contexts</li>
</ul>

<h3 data-icon="👥">Community-Centered</h3>
<ul>
<li>Open source with clear contribution guidelines</li>
<li>Collaborative development between educators</li>
<li>Shared knowledge base that improves over time</li>
</ul>

<h3 data-icon="🔧">Teacher-Friendly</h3>
<ul>
<li>Designed by educators for educators</li>
<li>Clear assessment rubrics and evaluation tools</li>
<li>Minimal setup time with maximum educational impact</li>
<li>Integration with existing teaching workflows</li>
</ul>
</div>
