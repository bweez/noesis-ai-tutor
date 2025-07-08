---
layout: default
title: "Blog"
description: "Latest updates, announcements, and insights from the Noesis AI Tutor Framework community"
permalink: /blog/
---

# 📖 Noesis Blog

Stay updated with the latest developments, insights, and community contributions to the AI Tutor Framework.

## Recent Posts

{% for post in site.posts %}

<div class="card mb-4">
<div class="card-header">
<div class="d-flex justify-content-between align-items-start">
<h4 class="mb-0">
<a href="{{ post.url | relative_url }}" class="text-decoration-none">{{ post.title }}</a>
</h4>
<small class="text-muted">{{ post.date | date: "%B %d, %Y" }}</small>
</div>
{% if post.author %}
<small class="text-muted">by {{ post.author }}</small>
{% endif %}
</div>
<div class="card-body">

{% if post.excerpt %}
{{ post.excerpt }}
{% else %}
{{ post.content | strip_html | truncate: 300 }}
{% endif %}

{% if post.categories %}
<p><strong>Categories:</strong> 
{% for category in post.categories %}
<span class="badge bg-secondary">{{ category }}</span>
{% endfor %}
</p>
{% endif %}

{% if post.tags %}
<p><strong>Tags:</strong> 
{% for tag in post.tags %}
<span class="badge bg-light text-dark">{{ tag }}</span>
{% endfor %}
</p>
{% endif %}

<a href="{{ post.url | relative_url }}" class="btn btn-primary btn-sm">Read More</a>

</div>
</div>

{% endfor %}

{% if site.posts.size == 0 %}
<div class="text-center">
<div class="card">
<div class="card-body">
<i class="fas fa-edit fa-3x text-muted mb-3"></i>
<h4 class="text-muted">Welcome to the Noesis Blog</h4>
<p class="text-muted">This is where we'll share updates, insights, and community contributions.</p>
<p class="text-muted">Check back soon for our first posts!</p>
</div>
</div>
</div>
{% endif %}

## What You'll Find Here

### 📢 Announcements
- New features and framework updates
- Community milestones and achievements
- Important changes and improvements

### 🎓 Educational Insights
- Research findings on AI-assisted learning
- Best practices from classroom implementations
- Student and teacher success stories

### 🔧 Technical Updates
- Framework improvements and bug fixes
- New tools and resources
- Integration guides and tutorials

### 👥 Community Spotlights
- Contributor highlights
- Featured questions and subjects
- Innovative uses of the framework

## Stay Connected

- **RSS Feed** - Subscribe to get updates automatically
- **GitHub** - Follow our repository for technical updates
- **Community** - Join discussions and share experiences

<a href="{{ '/blog/' | relative_url }}" class="btn btn-primary">View All Posts</a>
<a href="{{ '/framework/' | relative_url }}" class="btn btn-secondary">Framework Documentation</a>
