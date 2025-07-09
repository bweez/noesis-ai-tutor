# OpenAI Custom GPTs for Noesis AI Tutor Framework

This directory contains configurations for custom ChatGPT GPTs designed for the Noesis AI Tutor Framework. Each GPT is specialized for specific subjects and follows our critical thinking methodology.

## 📁 Directory Structure

```
openai/
├── custom-gpts/
│   ├── knowledge-files/
│   │   └── shared-resources.txt         # Common resources across subjects
│   ├── algebra-1/
│   │   ├── algebra-1-tutor.yml         # Algebra 1 GPT configuration
│   │   └── knowledge-files/
│   │       └── algebra-specific.pdf    # Subject-specific knowledge files
│   ├── geometry/
│   │   ├── geometry-tutor.yml          # Geometry GPT configuration
│   │   └── knowledge-files/
│   │       └── geometry-specific.pdf   # Subject-specific knowledge files
│   ├── biology/
│   │   ├── biology-tutor.yml           # Biology GPT configuration
│   │   └── knowledge-files/
│   │       └── biology-specific.pdf    # Subject-specific knowledge files
│   └── template.yml                    # Template for new GPTs
└── README.md                           # This file
```

## 🚀 Quick Start

### Creating a New Custom GPT

1. **Create subject folder**: Make a new folder under `custom-gpts/` with your subject name (e.g., `chemistry/`)
2. **Copy the template**: Use `template.yml` as your starting point for `[subject]-tutor.yml`
3. **Customize for your subject**: Fill in subject-specific instructions and settings
4. **Add knowledge files**: Create a `knowledge-files/` folder within your subject folder for any supporting documents
5. **Create the GPT**: Follow the setup instructions below
6. **Test and iterate**: Verify the GPT follows Noesis methodology
7. **Document and share**: Update the configuration file with final settings

### Setup Process

1. Go to [ChatGPT](https://chat.openai.com/)
2. Click "Create a GPT" or visit [GPT Builder](https://chat.openai.com/gpts/editor)
3. Use the configuration from your subject's YAML file to set up the GPT
4. Upload any knowledge files from your subject's `knowledge-files/` folder and shared resources
5. Test the GPT with sample questions from your subject area
6. Save and get the sharing link
7. Update your subject's YAML config with the final GPT URL

## 📋 Configuration Template

Each GPT configuration follows this structure:

```yaml
name: "Subject Name Tutor"
description: "Brief description of the tutor's purpose"
instructions: |
  Core instructions following Noesis methodology
conversation_starters:
  - "Sample conversation starter"
knowledge_files:
  - name: "filename.pdf"
    description: "File description"
```

See `template.yml` for the complete structure.

## 🗂️ File Organization Strategy

### Subject Folders
Each subject gets its own dedicated folder under `custom-gpts/`:
- Contains the subject-specific GPT configuration file
- Includes a `knowledge-files/` subfolder for supporting documents
- Keeps all related resources organized and easily maintainable

### Shared Resources
Common files used across multiple subjects are stored in:
- `custom-gpts/knowledge-files/` - for resources applicable to multiple subjects
- Examples: general study strategies, critical thinking guides, assessment rubrics

### Benefits of This Structure
- **Modularity**: Each subject is self-contained and portable
- **Scalability**: Easy to add new subjects without reorganizing existing ones
- **Maintenance**: Updates to one subject don't affect others
- **Collaboration**: Teams can work on different subjects independently

## 🎯 Noesis Methodology Guidelines

All custom GPTs must follow these core principles:

### Critical Thinking First
- **Never give direct answers** - guide students to discover solutions
- **Ask probing questions** that promote deeper understanding
- **Encourage students to explain their reasoning** at each step
- **Help students make connections** between concepts

### Socratic Method
- **Start with what students know** - activate prior knowledge
- **Use leading questions** to guide discovery
- **Encourage verification** - have students check their work
- **Deepen understanding** with "what if" scenarios

### Assessment Focus
- **Praise the thinking process**, not just correct answers
- **Encourage follow-up questions** from students
- **Create teachable moments** from mistakes
- **Build confidence** through guided discovery

## 🛠️ Required Configuration Elements

### Essential Instructions
Every GPT must include:

1. **Role Definition**: Clear statement of the tutor's purpose
2. **Teaching Methodology**: Reference to Socratic method and critical thinking
3. **Subject Scope**: Specific topics and grade levels covered
4. **Interaction Guidelines**: How to respond to different types of questions
5. **Assessment Integration**: How conversations support evaluation

### Conversation Starters
Provide 3-4 starters that:
- Cover different difficulty levels
- Represent common student questions
- Encourage deep thinking from the start
- Are specific to the subject area

### Knowledge Files (Optional)
Include relevant files that:
- Support the subject curriculum
- Provide examples and practice problems
- Include common misconceptions and how to address them
- Reference assessment rubrics

**File Organization:**
- **Shared files**: Place general educational resources in `custom-gpts/knowledge-files/`
- **Subject-specific files**: Place specialized content in your subject's `knowledge-files/` folder
- **File naming**: Use descriptive names that indicate content and version (e.g., `algebra-common-mistakes-v2.pdf`)

## 📚 Subject-Specific Considerations

### Mathematics (Algebra, Geometry, etc.)
- Emphasize step-by-step reasoning
- Focus on multiple solution approaches
- Include visual/graphical thinking prompts
- Address common algebraic misconceptions

### Sciences (Biology, Chemistry, Physics)
- Encourage hypothesis formation
- Promote observation and analysis skills
- Connect concepts to real-world applications
- Include experimental thinking prompts

### Language Arts
- Focus on textual evidence and analysis
- Encourage multiple interpretations
- Develop argument construction skills
- Promote close reading techniques

### Social Studies
- Emphasize source analysis and evaluation
- Encourage perspective-taking
- Develop argument and evidence skills
- Connect historical and contemporary contexts

## ✅ Testing Your GPT

### Before Deployment
Test your GPT with these scenarios:

1. **Direct Answer Request**: Student asks for a direct answer
   - ✅ GPT should redirect to guiding questions
   - ❌ GPT should not provide the answer directly

2. **Confused Student**: Student says they don't understand
   - ✅ GPT should break down the concept into smaller parts
   - ✅ GPT should connect to prior knowledge

3. **Advanced Student**: Student asks extension questions
   - ✅ GPT should encourage deeper exploration
   - ✅ GPT should provide appropriate challenges

4. **Wrong Answer**: Student provides incorrect reasoning
   - ✅ GPT should guide them to identify the error
   - ❌ GPT should not simply say "that's wrong"

### Quality Checklist
- [ ] Instructions clearly define the tutor role
- [ ] Socratic method is emphasized throughout
- [ ] Subject-specific content is accurate
- [ ] Conversation starters are engaging and appropriate
- [ ] Knowledge files (if any) are relevant and up-to-date
- [ ] GPT redirects direct answer requests appropriately
- [ ] Responses encourage critical thinking

## 🔗 Integration with Framework

### Assignment Integration
- GPT links should be included in subject pages
- Assignment pages should reference the appropriate GPT
- Conversation examples should demonstrate good interactions

### Assessment Integration
- Student conversations should align with grading rubric
- GPT responses should model good questioning techniques
- Teachers should be able to assess critical thinking from conversations

## 📞 Support and Updates

### Maintaining GPTs
- Regularly test GPTs with new questions
- Update instructions based on student feedback
- Revise conversation starters seasonally
- Keep knowledge files current

### Version Control
- Update the YAML configuration when making changes
- Document major revisions in the config notes
- Test changes thoroughly before deploying
- Maintain backup configurations for rollback

## 🤝 Contributing

When creating new GPTs:

1. **Create a subject folder** under `custom-gpts/` with a clear, descriptive name
2. **Follow the template structure** for consistency in your configuration file
3. **Organize knowledge files** in your subject's `knowledge-files/` subfolder
4. **Test thoroughly** with real student scenarios
5. **Document your configuration** completely in YAML
6. **Share successful patterns** with other educators
7. **Report issues** or improvements needed

### Naming Conventions
- **Subject folders**: Use lowercase with hyphens (e.g., `world-history`, `ap-chemistry`)
- **Config files**: Match folder name with `-tutor.yml` suffix (e.g., `world-history-tutor.yml`)
- **Knowledge files**: Use descriptive names with version numbers when appropriate

## 📖 Additional Resources

- [Noesis Framework Documentation](../../noesis-docs/framework/)
- [Critical Thinking Rubric](../../noesis-docs/framework/critical-thinking-rubric/)
- [Question Format Guide](../../noesis-docs/framework/question-format/)
- [OpenAI GPT Best Practices](https://help.openai.com/en/articles/8554397-gpt-best-practices)

---

## Getting Help

If you need assistance:
1. Check the template.yml for guidance
2. Review existing GPT configurations for examples
3. Test your GPT with the quality checklist
4. Consult the framework documentation for methodology questions