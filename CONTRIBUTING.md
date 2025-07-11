# 🤝 Contributing to Noesis AI Tutor Framework

Welcome! We're thrilled you're interested in contributing to open-source educational technology. This guide outlines how you can help improve the Noesis AI Tutor Framework.

## 🎯 How You Can Contribute

### 🐛 Report Issues
Found a bug? Have a suggestion? We want to hear from you!

### 💻 Submit Code
Ready to contribute code? We have tasks for all skill levels.

### 📚 Improve Documentation
Help make our guides clearer and more comprehensive.

### 🧪 Test and Provide Feedback
Try the framework in real educational settings and share your experience.

### 🎨 Design and UX
Help improve the user experience for teachers and students.

## 📋 Before You Start

### Read Our Values

The Noesis framework is built on these principles:
- **Education-first design**: Every feature should clearly benefit learning
- **Teacher autonomy**: Tools should empower, not replace, human judgment  
- **Student agency**: Technology should help students think, not think for them
- **Inclusive access**: Solutions should work for all students and schools

### Understand Our Audience

- **Teachers**: Need practical, easy-to-use tools that integrate with existing workflows
- **Students**: Benefit from AI that challenges them to think critically
- **Developers**: Want clean, well-documented code that's easy to extend
- **Administrators**: Require transparent, auditable educational technology

## 🐛 Reporting Issues

### Bug Reports

**Before reporting a bug**, please:
1. Check if the issue already exists in our [GitHub Issues](https://github.com/bweez/noesis-ai-tutor/issues)
2. Try to reproduce the issue with the latest version
3. Test in a clean environment if possible

**When reporting a bug**, include:
```markdown
## Bug Description
Brief, clear description of what's wrong

## Steps to Reproduce
1. Go to...
2. Click on...
3. See error...

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: (macOS, Linux, Windows)
- Browser: (Chrome, Firefox, Safari, etc.)
- Ruby version: (run `ruby --version`)
- Jekyll version: (run `bundle exec jekyll --version`)

## Screenshots
If applicable, add screenshots to help explain

## Additional Context
Any other relevant information
```

### Feature Requests

**Before suggesting a feature**:
1. Check if it aligns with our educational mission
2. Search existing issues for similar requests
3. Consider if it benefits teachers, students, or both

**When requesting a feature**:
```markdown
## Feature Summary
Clear, concise description of the proposed feature

## Educational Value
How does this benefit teaching and learning?

## Use Case
Describe a specific scenario where this would be helpful

## Proposed Implementation
Any ideas about how this could work?

## Alternatives Considered
Other solutions you've thought about
```

### Labels We Use

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Improvements to docs
- `good-first-issue`: Great for newcomers
- `help-wanted`: We'd love community help
- `priority-high`: Important issues
- `priority-low`: Nice-to-have improvements
- `question`: Questions about usage
- `wontfix`: Issues we won't address

## 💻 Code Contributions

### Development Workflow

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/noesis-ai-tutor.git
   cd noesis-ai-tutor
   ```
3. **Set up the development environment** (see [Technical Setup](TECHNICAL_SETUP.md))
4. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make your changes** following our coding standards
6. **Test your changes** thoroughly
7. **Commit your changes** with clear messages
8. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
9. **Open a Pull Request** with a detailed description

### Coding Standards

#### File Organization
- Keep related files together
- Use descriptive file and directory names
- Follow existing project structure

#### HTML/Liquid Templates
```liquid
<!-- Use semantic HTML -->
<article class="subject-card">
  <h2>{{ subject.title }}</h2>
  <p>{{ subject.description }}</p>
</article>

<!-- Handle edge cases gracefully -->
{% if site.subjects.size > 0 %}
  {% for subject in site.subjects %}
    <!-- content -->
  {% endfor %}
{% else %}
  <p>No subjects available.</p>
{% endif %}
```

#### CSS/SCSS
```scss
// Use meaningful class names
.subject-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  
  // Group related properties
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
}

// Use CSS custom properties for consistency
:root {
  --primary-color: #007bff;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
}
```

#### Markdown Content
```markdown
---
title: "Clear, Descriptive Title"
description: "Brief description for SEO and navigation"
category: "setup|guides|tools"
order: 1
---

# Page Title

Brief introduction paragraph.

## Main Sections

Use meaningful headings that create a logical hierarchy.

### Subsections

Keep content scannable with:
- Bullet points for lists
- **Bold text** for emphasis
- `code blocks` for technical terms

## Code Examples

```bash
# Always include comments explaining commands
bundle exec jekyll serve --livereload
```
```

### Testing Requirements

Before submitting a Pull Request:

1. **Test locally**:
   ```bash
   bundle exec jekyll serve
   ```
2. **Check for broken links**:
   ```bash
   bundle exec jekyll build
   # Manually check navigation and internal links
   ```
3. **Validate HTML** using browser dev tools
4. **Test responsive design** on different screen sizes
5. **Verify accessibility** with screen readers or accessibility tools

### Commit Message Guidelines

Use clear, descriptive commit messages:

```bash
# Good examples
git commit -m "Add mobile-responsive navigation menu"
git commit -m "Fix broken links in framework documentation"
git commit -m "Update algebra subject with new question format"

# Not helpful
git commit -m "Fix stuff"
git commit -m "Update files"
git commit -m "Changes"
```

**Format:**
- Use present tense ("Add feature" not "Added feature")
- Keep first line under 50 characters
- Include more details in the body if needed

### Pull Request Guidelines

**Before submitting:**
- [ ] Fork the repository and create a feature branch
- [ ] Test your changes locally
- [ ] Update documentation if needed
- [ ] Write clear commit messages
- [ ] Ensure your code follows our style guidelines

**PR Title:** Use a clear, descriptive title
```
Add responsive grid layout for subject cards
Fix navigation menu accessibility issues
Update framework documentation structure
```

**PR Description Template:**
```markdown
## What This PR Does
Brief description of changes

## Why These Changes Are Needed
Educational benefit or technical improvement

## Testing Done
- [ ] Tested locally
- [ ] Checked responsive design
- [ ] Verified accessibility
- [ ] Tested with different browsers

## Screenshots (if applicable)
Before/after images showing the changes

## Related Issues
Closes #123
Related to #456
```

## 📚 Documentation Contributions

### What Needs Documentation

- **Setup guides** for different operating systems
- **Tutorial content** for creating new subjects
- **Best practices** for educational AI implementation
- **Troubleshooting guides** for common issues
- **API documentation** for developer tools

### Documentation Standards

- **Write for your audience**: Teachers need different information than developers
- **Use clear headings** to make content scannable
- **Include examples** for complex concepts
- **Test all instructions** to ensure they work
- **Keep content up-to-date** as the framework evolves

### Style Guide

- Use **second person** ("you") when giving instructions
- **Active voice** is preferred over passive voice
- **Short paragraphs** (2-3 sentences max)
- **Bullet points** for lists and steps
- **Code blocks** for technical examples
- **Screenshots** where helpful (but not for everything)

## 🧪 Testing and Feedback

### User Testing

Help us improve by testing the framework in real educational settings:

1. **Try the framework** with actual students
2. **Document your experience** - what worked, what didn't
3. **Share specific examples** of student interactions
4. **Report usability issues** from teacher and student perspectives

### Feedback Format

When providing feedback:
```markdown
## Context
- Subject area: (Algebra, Biology, etc.)
- Grade level: (9th grade, College, etc.)
- Class size: (Small group, full class, etc.)
- Duration: (One lesson, full unit, etc.)

## What Worked Well
Specific examples of positive outcomes

## Challenges Encountered
Issues faced by teachers or students

## Suggestions for Improvement
Specific, actionable recommendations

## Overall Assessment
Would you recommend this to other educators?
```

## 🎨 Design and UX Contributions

### Design Principles

- **Accessibility first**: Ensure all users can access content
- **Mobile-responsive**: Work well on all device sizes
- **Clean and minimal**: Avoid visual clutter
- **Consistent**: Use established patterns and components
- **Fast loading**: Optimize for performance

### UX Research Areas

- **Teacher workflow integration**: How does this fit into existing teaching practices?
- **Student engagement**: What motivates students to think critically?
- **Accessibility**: How can we serve students with different needs?
- **Performance**: How does site speed affect learning?

## 🏷️ Issue Labels and Project Management

### Priority Levels
- **priority-critical**: Blocking core functionality
- **priority-high**: Important for user experience
- **priority-medium**: Useful improvements
- **priority-low**: Nice-to-have features

### Skill Levels
- **good-first-issue**: Perfect for newcomers
- **intermediate**: Requires some experience
- **advanced**: Complex features needing expertise

### Component Areas
- **frontend**: HTML, CSS, JavaScript changes
- **content**: Markdown, documentation updates
- **backend**: Jekyll configuration, plugins
- **infrastructure**: Deployment, hosting, CI/CD

## 🗣️ Community Guidelines

### Code of Conduct

We're committed to providing a welcoming, inclusive environment for all contributors. We expect:

- **Respectful communication** in all interactions
- **Constructive feedback** that helps improve the project
- **Inclusive language** that welcomes diverse perspectives
- **Focus on education** and student benefit in all discussions

### Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community conversation
- **Documentation**: Check our guides before asking questions
- **Social Media**: Follow [@AcademyNoesis](https://twitter.com/AcademyNoesis) for updates

### Recognition

We value all contributions! Contributors will be:
- **Listed in our contributors file**
- **Credited in release notes** for significant contributions
- **Featured on social media** for major improvements
- **Invited to join** our core contributor team for ongoing involvement

## 🚀 What Happens Next?

After you submit a contribution:

1. **Acknowledgment**: We'll respond within 48 hours
2. **Review process**: Code review and testing
3. **Feedback**: Requested changes or approval
4. **Merge**: Integration into the main branch
5. **Recognition**: Credit in contributors list

## 🔗 Quick Links

- [Technical Setup Guide](TECHNICAL_SETUP.md)
- [GitHub Issues](https://github.com/bweez/noesis-ai-tutor/issues)
- [Project Board](https://github.com/bweez/noesis-ai-tutor/projects)
- [License](LICENSE)

---

**Thank you for contributing to open-source education technology!** 

Every contribution, no matter how small, helps us build better tools for teachers and students. Together, we're creating AI that makes students better thinkers, not just better test-takers.

*Ready to get started? Check out our [good first issues](https://github.com/bweez/noesis-ai-tutor/labels/good-first-issue)!*
