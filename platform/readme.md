# 🧠 Noesis AI Tutor Framework - Platform

Welcome to the **Noesis AI Tutor Framework** platform directory! This is where developers can contribute to building educational AI tools that empower teachers and develop critical thinking in students.

## 🎯 Project Goals

### For Teachers: Leverage AI, Don't Fight It
Instead of viewing AI as a threat to education, Noesis provides teachers with tools to:
- **Guide student-AI interactions** toward deeper learning
- **Assess critical thinking skills** through AI conversation analysis
- **Create structured learning experiences** that use AI as a thinking partner
- **Save time on repetitive tasks** while focusing on meaningful instruction

### For Students: Think Critically About AI
Rather than accepting AI answers blindly, students learn to:
- **Question AI responses** and verify information
- **Explain their reasoning** when working with AI tutors
- **Develop independent thinking** through Socratic questioning
- **Build confidence** in their own problem-solving abilities

### For Developers: Build the Future of Education
We're creating an open-source ecosystem that enables:
- **Customizable AI tutors** for any subject or learning objective
- **Assessment tools** that measure critical thinking, not just correct answers
- **Integration platforms** that work with existing educational technology
- **Research-backed methodologies** implemented in practical tools

## 🚀 What We're Building

### Current Components

```
noesis-docs/               # Main documentation/website
platform/
├── llm-configs/           # LLM-specific configurations and templates
│   └── openai/           # Custom ChatGPT configurations
├── assessment-tools/      # Tools for evaluating student-AI interactions
└── cli/                  # Command-line tools for developers and educators
```

### 🔧 Areas That Need Development

We're actively seeking contributors in these areas:

#### 🗂️ Content Management
- **Curriculum builders** for creating structured learning paths
- **Question banks** with automatic tagging and difficulty assessment
- **Assessment rubrics** that integrate with AI conversation analysis
- **Content versioning** and collaborative editing tools

#### 💻 CLI Features
- **GPT deployment tools** for easy custom tutor creation
- **Conversation analysis** scripts for bulk assessment
- **Content migration** utilities for existing educational materials
- **Development workflows** for testing and debugging AI tutors

#### 🤖 New LLM Implementations
- **Multi-provider support** (Anthropic, Google, local models)
- **Model comparison tools** for educational effectiveness
- **Fine-tuning pipelines** for subject-specific tutors
- **Cost optimization** and usage monitoring

## 🔗 Integrated GPT Management

### Centralized Configuration System
Our platform includes an innovative **single source of truth** system for GPT management:

- **Automatic Integration**: Jekyll site dynamically pulls GPT URLs from configuration files
- **No Duplicate Maintenance**: Update URLs in one place, reflected everywhere automatically
- **Error Prevention**: Built-in validation and graceful handling of missing configurations
- **Future-Proof**: Ready for multi-LLM support and API integrations

**Key Benefits:**
```yaml
# Instead of maintaining URLs in multiple places:
deployment:
  chatgpt_url: "https://chat.openai.com/g/g-your-actual-id"  # Single source of truth
```

```liquid
<!-- Templates automatically get the URL: -->
{% assign gpt_url = "algebra-1" | gpt_url %}
{% if gpt_url %}
  <a href="{{ gpt_url }}">Open AI Tutor</a>
{% endif %}
```

See [GPT Integration Guide](./llm-configs/openai/GPT_INTEGRATION.md) for implementation details.

## 🤝 Contributing to Open Source Education

### Why Open Source Matters in Education

Education should be **accessible**, **transparent**, and **collaborative**. By making Noesis open source, we ensure:

- **Affordability**: Schools can implement AI tutoring without expensive licenses
- **Customization**: Educators can adapt tools to their specific needs
- **Transparency**: AI behavior in education should be understandable and auditable
- **Innovation**: The best educational ideas come from teachers and students themselves

### How You Can Help

- **Implement new features** from our [roadmap](https://github.com/bweez/noesis-ai-tutor/issues)
- **Fix bugs** and improve performance [issues](https://github.com/bweez/noesis-ai-tutor/issues)
- **Create integrations** with popular educational platforms
- **Write documentation** and tutorials for other developers


## 🛠️ Getting Started as a Developer

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/bweez/noesis-ai-tutor.git
   cd noesis-ai-tutor
   ```

2. **Choose your contribution area**
   - [LLM Configurations](./llm-configs/) - Create custom AI tutors
   - [Assessment Tools](./assessment-tools/) - Build evaluation systems
   - [CLI Tools](./cli/) - Developer and educator utilities
   - [📚 Main Documentation](../noesis-docs/) - Content management tooling 

3. **Read the contribution guidelines**
   - Check out [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines

### Development Philosophy

We believe in:
- **Education-first design**: Every feature should clearly benefit learning
- **Teacher autonomy**: Tools should empower, not replace, human judgment
- **Student agency**: Technology should help students think, not think for them
- **Inclusive access**: Solutions should work for all students and schools

## 💬 Join the Community

### Connect With Us

- **GitHub Discussions**: Share ideas and get help with development
- **Social Media**: Reach out on Twitter [@AcademyNoesis](https://twitter.com/AcademyNoesis)

### Stay Updated
- **Newsletter**: Monthly updates on project progress and opportunities
- **Blog**: Deep dives into educational AI methodology and case studies
- **Social Media**: Follow [@AcademyNoesis](https://twitter.com/AcademyNoesis) for quick updates

## 📋 Next Steps

Ready to contribute? Here's what to do:

1. **Explore the codebase** and identify an area that interests you
2. **Read the documentation** for your chosen component
3. **Check open issues** for beginner-friendly tasks labeled `good-first-issue`
4. **Join our community** to introduce yourself and ask questions
5. **Make your first contribution** and help shape the future of education

---

## 🔗 Quick Links

- [📚 Main Documentation](../noesis-docs/)
- [🤖 LLM Configurations](./llm-configs/)
- [📊 Assessment Tools](./assessment-tools/)
- [⚙️ CLI Tools](./cli/)
- [🤝 Contributing Guide](../CONTRIBUTING.md)
- [📝 License](../LICENSE)

**Together, we're building AI tools that make students better thinkers, not just better test-takers.**

*Welcome to the future of education technology!* 🚀
