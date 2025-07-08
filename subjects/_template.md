---
layout: subject
title: "[Subject Name]"
slug: "[subject-slug]"
description: "[Brief description of what students will learn and how the AI tutor helps]"
grade_levels: [X, Y, Z]
difficulty_levels: [beginner, intermediate, advanced]
chatgpt_link: "https://chat.openai.com/g/g-XXXXXXXX" # Update with actual ChatGPT link
key_topics:
  - "[Topic 1]"
  - "[Topic 2]"
  - "[Topic 3]"
  - "[Topic 4]"
prerequisites:
  - "[Prerequisite 1]"
  - "[Prerequisite 2]"
learning_outcomes:
  - "[Learning outcome 1]"
  - "[Learning outcome 2]"
  - "[Learning outcome 3]"
---

# {{ page.title }}

{{ page.description }}

## 🤖 AI Tutor Setup

### Custom GPT Configuration

**Name:** {{ page.title }} Tutor  
**Link:** [Access AI Tutor]({{ page.chatgpt_link }}){: .btn .btn-success target="_blank"}

### ChatGPT Instructions

```
You are a {{ page.title }} tutor focused on guiding students through critical thinking rather than giving direct answers. Your role is to:

1. **Never give direct answers immediately** - always guide students to discover solutions
2. **Ask probing questions** to help students think through problems step by step
3. **Encourage exploration** of [subject-specific] relationships and patterns
4. **Build confidence** by celebrating student insights and discoveries
5. **Connect concepts** to help students see the bigger picture

## Core Principles:
- Start with what the student knows
- Ask "What do you think?" before explaining
- Use leading questions to guide discovery
- Encourage students to explain their reasoning
- Help students verify their own solutions

## Subject Focus: 
[List the key topics and skills specific to this subject]

## Response Style:
- Use encouraging, supportive language
- Ask one question at a time
- Wait for student responses before proceeding
- Celebrate discoveries: "Great thinking!" or "You've got it!"
- If students are stuck, offer hints rather than answers

Remember: Your goal is to develop [subject-specific] thinking, not just solve problems.
```

### Knowledge Base
Upload any relevant curriculum materials, example problems, or supplementary resources specific to your {{ page.title }} course.

## 📚 Available Questions

{% assign subject_questions = site.questions | where: "subject", page.slug | group_by: "difficulty" %}

{% for difficulty_group in subject_questions %}
### {{ difficulty_group.name | capitalize }} Level

{% for question in difficulty_group.items %}
<div class="card mb-2">
<div class="card-body">
<h6 class="card-title">
<a href="{{ question.url | relative_url }}" class="text-decoration-none">{{ question.title }}</a>
{% if question.time_estimate %}
<span class="badge bg-secondary ms-2">{{ question.time_estimate }}</span>
{% endif %}
</h6>
<p class="card-text small">{{ question.description | default: question.content | strip_html | truncate: 100 }}</p>
</div>
</div>
{% endfor %}

{% endfor %}

## 🎯 Learning Approach

Our AI tutor is specifically designed to:

- **Guide Discovery**: Never give direct answers immediately
- **Encourage Questions**: Prompt students to ask "why" and "how"
- **Build Understanding**: Help students see connections between concepts
- **Develop Reasoning**: Focus on [subject-specific] thinking processes
- **Boost Confidence**: Celebrate discoveries and insights

## 📊 Assessment Focus

Students are evaluated on their **critical thinking process**, not just getting the right answer. Look for:

- Quality of follow-up questions
- Depth of exploration
- Connections to prior knowledge
- [Subject-specific] reasoning
- Verification strategies

## 🚀 Get Started

**New to AI tutoring?** Check out our [Quick Start Guide]({{ '/subjects/quick-start-guide/' | relative_url }}) for detailed instructions for teachers and students.

**Ready to dive in?** [Access the {{ page.title }} AI Tutor]({{ page.chatgpt_link }}){: .btn .btn-primary target="_blank"}

## 📖 Support Resources

- **[Framework Guide]({{ '/framework/' | relative_url }})**: Understanding the teaching approach
- **[Question Templates]({{ '/framework/question-format/' | relative_url }})**: For creating new questions
- **[Assessment Rubric]({{ '/framework/critical-thinking-rubric/' | relative_url }})**: How conversations are graded
- **[Example Conversations]({{ '/examples/' | relative_url }})**: See what excellent engagement looks like

## 🤝 Contributing

Help improve {{ page.title }} education by:
- Adding new questions to our collection
- Sharing successful conversation examples
- Refining bot instructions based on classroom experience
- Creating supplementary materials

See our [contribution guide]({{ '/framework/' | relative_url }}) to get started.
