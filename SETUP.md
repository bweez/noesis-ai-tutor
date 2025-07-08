# GitHub Pages Setup Guide

This guide will help you deploy your Noesis AI Tutor Framework as a searchable blog using GitHub Pages.

## Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select "Deploy from a branch"
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

Your site will be available at: `https://yourusername.github.io/ai-tutor-framework`

### 2. Update Configuration

Edit `_config.yml` and update these values:

```yaml
title: "Your Framework Name"
description: "Your description"
baseurl: "/your-repository-name"
url: "https://yourusername.github.io"
author: "Your Name"
email: "your-email@example.com"
github_username: yourusername
```

### 3. Add Your First Question

Create a new file in `_questions/` folder:

```yaml
---
layout: question
title: "Your Question Title"
description: "Brief description of the question"
subject: your-subject-slug
difficulty: beginner|intermediate|advanced
grade_level: "8-10"
time_estimate: "15-20 minutes"
tags: [tag1, tag2, tag3]
chatgpt_link: "https://chat.openai.com/g/g-XXXXXXXX"
---

Your question content here...
```

### 4. Add Your First Subject

Create a new file in `_subjects/` folder:

```yaml
---
layout: subject
title: "Subject Name"
slug: subject-slug
description: "Subject description"
grade_levels: [8, 9, 10]
difficulty_levels: [beginner, intermediate, advanced]
chatgpt_link: "https://chat.openai.com/g/g-XXXXXXXX"
key_topics:
  - "Topic 1"
  - "Topic 2"
---

Subject content here...
```

## Features Available

### 🔍 Search Functionality
- Full-text search across all content
- Search by title, content, subject, and tags
- Real-time filtering

### 🏷️ Tagging System
- Tag questions by topic, difficulty, concept
- Filter content by multiple tags
- Tag cloud visualization

### 📱 Responsive Design
- Mobile-friendly interface
- Bootstrap-based responsive layout
- Print-friendly question pages

### 🎨 Professional Appearance
- Clean, educational design
- Easy navigation
- Clear content hierarchy

## Local Development

To test your site locally:

1. Install Ruby and Jekyll:
```bash
# On macOS with Homebrew
brew install ruby
gem install jekyll bundler

# On other systems, see: https://jekyllrb.com/docs/installation/
```

2. Install dependencies:
```bash
cd ai-tutor-framework
bundle install
```

3. Run the development server:
```bash
bundle exec jekyll serve
```

4. Open `http://localhost:4000` in your browser

## Customization

### Adding New Content Types

1. Create a new collection in `_config.yml`:
```yaml
collections:
  newtype:
    output: true
    permalink: /:collection/:name/
```

2. Create a new layout in `_layouts/newtype.html`
3. Add content in `_newtype/` folder

### Styling Changes

Edit `assets/css/main.css` to customize:
- Colors and themes
- Typography
- Layout spacing
- Component styles

### Adding Analytics

Uncomment and configure in `_config.yml`:
```yaml
google_analytics: "UA-XXXXXXXX-X"
```

## SEO Optimization

The site includes:
- Jekyll SEO Tag plugin
- Structured metadata
- Social media previews
- Sitemap generation
- Search engine friendly URLs

## Maintenance

### Regular Updates
- Keep Jekyll and gems updated
- Monitor GitHub Pages build status
- Review and moderate contributions
- Update ChatGPT links as needed

### Content Management
- Use consistent tagging
- Maintain question quality
- Update examples regularly
- Monitor user feedback

## Troubleshooting

### Common Issues

**Site not building?**
- Check GitHub Pages build status in repository settings
- Verify YAML front matter syntax
- Ensure all required fields are present

**Search not working?**
- Check browser console for JavaScript errors
- Verify Lunr.js is loading correctly
- Ensure search data is being generated

**Styling issues?**
- Clear browser cache
- Check CSS file paths
- Verify Bootstrap CDN is accessible

### Getting Help

- Check Jekyll documentation: https://jekyllrb.com/docs/
- GitHub Pages help: https://docs.github.com/en/pages
- Open an issue in this repository for framework-specific problems

## Next Steps

1. **Add Content**: Start with 3-5 questions per subject
2. **Test with Students**: Get real classroom feedback
3. **Iterate**: Improve based on usage patterns
4. **Expand**: Add new subjects and difficulty levels
5. **Community**: Encourage teacher contributions

Your Noesis blog is now ready to enhance student learning through critical thinking!
