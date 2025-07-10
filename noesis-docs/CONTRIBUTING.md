# Contributing to Noesis

Thank you for your interest in contributing to Noesis! This project thrives on collaboration from educators, students, and developers who want to improve AI-assisted learning.

## 🎯 Ways to Contribute

### For Educators
- **Add New Subjects**: Create new subject folders with bot configurations and questions
- **Improve Questions**: Enhance existing questions or add new ones to current subjects
- **Refine Rubrics**: Help improve assessment criteria and grading guidelines

### For Students
- **Share Feedback**: Tell us what works well and what could be improved
- **Suggest Questions**: Propose interesting questions for your subjects
- **Report Issues**: Help us identify problems with bot configurations or unclear instructions

### For Developers
- **Improve Documentation**: Make instructions clearer and more comprehensive
- **Create Tools**: Build scripts or tools to help with setup or assessment
- **Enhance Templates**: Improve the framework templates and guidelines

## 🚀 Getting Started

### 1. Choose Your Contribution Type

**New Subject Area:**
- Review existing subjects as examples (`subjects/algebra-1/`)
- Follow the structure guide (`framework/subject-structure.md`)
- Use the bot template (`framework/bot-template.md`)

**New Questions:**
- Use the question format template (`framework/question-format.md`)
- Place in appropriate difficulty folder
- Include learning objectives and assessment criteria


### 2. Set Up Your Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/bweez/noesis-ai-tutor.git
cd noesis-ai-tutor

# Create a new branch for your contribution
git checkout -b add-biology-subject
# or
git checkout -b improve-algebra-questions
```

### 3. Follow the Structure Guidelines

Each subject must include:
- `README.md` (overview and quick start)
- `bot-config.md` (ChatGPT custom instructions)
- `questions/` folder with questions in it
- `rubrics/` folder with assessment guidelines
- `resources/` folder with setup guides

## 📋 Contribution Guidelines

### Quality Standards

**All Contributions Must:**
- Be educationally sound and age-appropriate
- Follow established templates and structures
- Include clear learning objectives
- Promote critical thinking over direct answers
- Be tested with actual students when possible

**Educational Content Should:**
- Align with common curriculum standards
- Be accessible to the target grade level
- Include multiple difficulty levels
- Encourage inquiry-based learning
- Connect to real-world applications

### Technical Requirements

**File Naming:**
- Use lowercase with hyphens: `linear-equations-solving.md`
- Include difficulty level in question files
- Use descriptive, searchable names

**Markdown Format:**
- Use consistent headers (## for sections, ### for subsections)
- Include code blocks for bot instructions
- Use checklists for assessment criteria
- Format examples clearly

**Directory Structure:**
- Follow the established subject structure exactly
- Place files in appropriate subfolders
- Include README files in each major folder

## 🔍 Review Process

### Before Submitting
- [ ] Test your bot configuration with ChatGPT
- [ ] Verify all links and references work
- [ ] Check spelling and grammar
- [ ] Ensure anonymity in any examples
- [ ] Confirm learning objectives are clear

### Pull Request Requirements
1. **Clear Title**: Describe what you're adding/changing
2. **Detailed Description**: Explain the educational value
3. **Testing Notes**: How you verified it works
4. **Related Issues**: Link to any relevant issues

### Review Criteria
Contributions will be evaluated on:
- Educational effectiveness
- Clarity of instructions
- Alignment with framework goals
- Quality of examples and assessments
- Technical accuracy

## 📝 Specific Contribution Types

### Adding a New Subject

1. Create the subject folder structure:
```
subjects/your-subject/
├── README.md
├── questions/
│   ├── beginner/
│   ├── intermediate/
│   ├── advanced/
│   └── README.md
├── rubrics/
└── resources/
```

2. Fill out each component using the templates
3. Test the bot configuration thoroughly
4. Include at least 3 questions per difficulty level
5. Provide sample conversations showing different engagement levels

### Improving Existing Content

1. Identify specific improvements needed
2. Make focused changes that enhance learning
3. Test changes with students if possible
4. Document what you changed and why

## 🤝 Community Guidelines

### Be Respectful
- Provide constructive feedback
- Assume good intentions
- Value diverse perspectives
- Support fellow educators

### Focus on Learning
- Prioritize student benefit over convenience
- Encourage deep thinking over quick answers
- Support inclusive education practices
- Maintain high educational standards

### Collaborate Openly
- Share knowledge freely
- Credit others' contributions
- Ask questions when unsure
- Help newcomers get started

## 📞 Getting Help

### Questions About Contributing
- Open an issue with the "question" label
- Check existing issues for similar questions
- Join discussions in pull requests

### Technical Issues
- Describe the problem clearly
- Include steps to reproduce
- Share relevant error messages
- Tag with appropriate labels

### Educational Discussions
- Use discussions for broader educational topics
- Share research or best practices
- Propose new framework directions
- Connect with other educators

## 🏆 Recognition

Contributors will be recognized in:
- Repository contributor list
- Subject-specific credits
- Community highlights
- Educational conference presentations (with permission)

## 📄 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project. This ensures the framework remains freely available for educational use.

---

Ready to contribute? We're excited to see what you'll add to help students learn better through AI-assisted critical thinking with Noesis!
