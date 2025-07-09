# Subject Folder Structure

Each subject should follow this standardized structure to ensure consistency and ease of use.

## Required Structure

```
subjects/[subject-name]/
├── README.md                 # Overview of the subject tutor
├── bot-config.md            # ChatGPT custom instructions
├── questions/               # Sample questions and activities
│   ├── beginner/           # Entry-level questions
│   ├── intermediate/       # Mid-level questions
│   ├── advanced/          # Complex questions
│   └── README.md          # Guide to using questions
├── rubrics/               # Grading guidelines
│   ├── critical-thinking-rubric.md
│   └── subject-specific-rubric.md
├── examples/              # Sample conversations
│   ├── good-example.md    # Example of excellent critical thinking
│   ├── needs-improvement.md # Example needing more depth
│   └── README.md          # How to interpret examples
└── resources/             # Additional materials
    ├── setup-guide.md     # How to create the custom GPT
    ├── teacher-guide.md   # Instructions for educators
    └── student-guide.md   # Instructions for students
```

## File Requirements

### README.md (Root of subject folder)
- Brief description of the subject tutor
- Learning objectives
- Recommended grade levels or prerequisites
- Quick start instructions

### bot-config.md
- Complete ChatGPT custom instructions
- Conversation starters
- Any knowledge files needed
- Settings configuration

### Questions Folder
- At least 3 questions per difficulty level
- Each question should include:
  - The main question
  - Learning objectives
  - Expected follow-up questions students should ask
  - Key concepts to explore

### Rubrics Folder
- Critical thinking assessment criteria
- Subject-specific grading guidelines
- Sample scoring examples

### Examples Folder
- Real or mock conversations showing different levels of engagement
- Commentary explaining what makes each example effective or ineffective

### Resources Folder
- Step-by-step setup instructions
- Teacher implementation guide
- Student usage instructions

## Naming Conventions

- Use lowercase with hyphens for folder names (e.g., `algebra-1`, `world-history`)
- Use descriptive filenames
- Include difficulty levels in question files (e.g., `beginner-linear-equations.md`)

## Quality Standards

- All content should be educationally sound
- Questions should encourage multiple valid approaches
- Examples should demonstrate clear thinking processes
- Instructions should be clear and actionable
