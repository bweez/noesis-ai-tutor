# 🧠 Noesis
## AI Tutor Framework

This is an open-source, markdown-driven framework for building and sharing subject-specific AI tutors powered by ChatGPT. The goal is to enhance student learning through critical thinking, while giving teachers insight into how students engage with questions.

## 🎯 Purpose

This project provides a structured, organized way for teachers, students, and contributors to:

- Build subject-specific AI chatbots with minimal technical overhead
- Share questions and learning activities through markdown files
- Capture and assess critical thinking in student-AI conversations
- Encourage open collaboration in education through a clean, maintainable structure

## 📁 Organized Structure

The framework uses a clean, hierarchical structure with everything organized under clear directories:

- **`src/content/`** - All content organized by type
  - **`pages/`** - Main site pages (markdown)
  - **`questions/`** - Individual question files with metadata
  - **`subjects/`** - Subject overviews and organization
  - **`framework/`** - Documentation and setup guides
- **`src/layouts/`** - Jekyll page templates
- **`src/includes/`** - Reusable HTML components
- **`src/assets/`** - CSS, JavaScript, and images
- **`_posts/`** - Blog posts (Jekyll convention)

See [`STRUCTURE.md`](STRUCTURE.md) for detailed information about the project organization.

## 📚 How It Works

### 1. Teacher Assigns a Question

Teachers choose or write a question and direct students to use a subject-specific chatbot.

### 2. Student Engages with the Chatbot

Students use the bot to explore and answer the question. The bot:
- Helps clarify concepts
- Encourages follow-up questions
- Records the conversation for review

### 3. Conversation Is Shared

Students submit a link to their AI conversation to the teacher.

### 4. Teacher Reviews and Grades

Teachers grade students not just on the answer, but on their use of critical thinking—especially their follow-up questions.

## 🛠️ Project Structure

```
ai-tutor-framework/
├── src/
│   ├── content/          # All content organized by type
│   │   ├── pages/        # Main site pages
│   │   ├── questions/    # Question library
│   │   ├── subjects/     # Subject guides
│   │   ├── framework/    # Documentation
│   ├── layouts/          # Jekyll templates
│   ├── includes/         # Reusable components
│   └── assets/           # CSS, JS, images
├── _posts/               # Blog posts
├── _config.yml           # Jekyll configuration
└── documentation files  # README, SETUP, etc.
```


## ✍️ Contributing

We welcome contributions! You can:
- Add new subject folders
- Suggest better questions
- Help refine bot instructions

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to get started.

## 📄 License

MIT License. See [LICENSE](./LICENSE).

## 📫 Contact

Created by [Brandon Williams](https://github.com/bweez) — ideas, feedback, and pull requests are all welcome!
