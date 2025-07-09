---
layout: homepage
title: "Noesis - AI Tutor Framework"
description: "Open-source framework for building subject-specific AI tutors that enhance student learning through critical thinking"
permalink: /
---

# 🎓 Noesis AI Tutor Framework
{: .text-center .mb-4}

Open-source framework for building and using subject specific AI tutors that enhance student learning through critical thinking and guided discovery.
{: .lead .text-center .mb-5}

## 🚀 Choose Your Path
{: .text-center .mb-4}

<div class="user-paths">
  <div class="path-card student">
    <h3>👥 I'm a Student</h3>
    <p>Ready to learn with AI tutors?</p>
    <div class="btn-container">
      <a href="{{ '/subjects/' | relative_url }}" class="btn btn-primary btn-lg">Start Learning</a>
      <a href="{{ '/subjects/algebra-1/' | relative_url }}" class="btn btn-outline-primary">Try Algebra Demo</a>
    </div>
  </div>

  <div class="path-card teacher">
    <h3>👩‍🏫 I'm a Teacher</h3>
    <p>Want to use this in your classroom?</p>
    <div class="btn-container">
      <a href="{{ '/framework/tools-onboarding/' | relative_url }}" class="btn btn-success btn-lg">Tools</a>
      <a href="{{ '/assignments/' | relative_url }}" class="btn btn-outline-success">View Assignments</a>
    </div>
  </div>

  <div class="path-card developer">
    <h3>👨‍💻 I'm a Developer</h3>
    <p>Interested in contributing?</p>
    <div class="btn-container">
      <a href="https://github.com/brandonwilliams/ai-tutor-framework" class="btn btn-dark btn-lg" target="_blank">View on GitHub</a>
      <a href="{{ '/framework/' | relative_url }}" class="btn btn-outline-dark">Documentation</a>
    </div>
  </div>
</div>

## 📚 Framework Components

{% assign framework_docs = site.framework | sort: 'order' %}
{% assign setup_docs = framework_docs | where: "category", "setup" %}
{% assign guide_docs = framework_docs | where: "category", "guides" %}
{% assign tool_docs = framework_docs | where: "category", "tools" %}

{% if setup_docs.size > 0 %}
### ⚙️ Setup & Configuration
{% for doc in setup_docs %}
#### [{{ doc.title }}]({{ doc.url | relative_url }})
{{ doc.description }}

[Read Documentation →]({{ doc.url | relative_url }}){: .btn .btn-primary .btn-sm}

{% endfor %}
{% endif %}

{% if guide_docs.size > 0 %}
### 📖 Implementation Guides
{% for doc in guide_docs %}
#### [{{ doc.title }}]({{ doc.url | relative_url }})
{{ doc.description }}

[Read Guide →]({{ doc.url | relative_url }}){: .btn .btn-primary .btn-sm}

{% endfor %}
{% endif %}

{% if tool_docs.size > 0 %}
### 📊 Assessment Tools
{% for doc in tool_docs %}
#### [{{ doc.title }}]({{ doc.url | relative_url }})
{{ doc.description }}

[View Tool →]({{ doc.url | relative_url }}){: .btn .btn-primary .btn-sm}

{% endfor %}
{% endif %}

### 📋 All Framework Documentation

{% for doc in framework_docs %}
#### [{{ doc.title }}]({{ doc.url | relative_url }})
{% if doc.category %}*{{ doc.category | capitalize }}*{% endif %}

{% if doc.description %}
{{ doc.description }}
{% else %}
{{ doc.content | strip_html | truncate: 150 }}
{% endif %}

[Read Documentation]({{ doc.url | relative_url }}){: .btn .btn-primary .btn-sm}

---

{% endfor %}

## 🎯 Framework Philosophy

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
- Integration with existing teaching workflows

## 🤝 Getting Involved

### 👩‍🏫 For Educators
- **Start using** with your students
- **Share feedback** and experiences  
- **Contribute content** and examples
- **Join the educator community**

### 👨‍💻 For Developers
- **Improve platform** infrastructure
- **Add new features** and tools
- **Enhance documentation**
- **Test across environments**

### 🔬 For Researchers  
- **Study learning effectiveness**
- **Share research findings**
- **Validate methodologies**
- **Explore new applications**

### 👥 For Students
- **Practice critical thinking**
- **Engage with AI tutors**
- **Provide feedback**
- **Help improve the experience**

---

[View All Subjects]({{ '/subjects/' | relative_url }}){: .btn .btn-primary .btn-lg .me-3 .mb-2}
[Browse Questions]({{ '/questions/' | relative_url }}){: .btn .btn-secondary .btn-lg .me-3 .mb-2}
[View Assignments]({{ '/assignments/' | relative_url }}){: .btn .btn-info .btn-lg .mb-2}
{: .text-center}
