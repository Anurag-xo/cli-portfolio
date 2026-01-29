# 🖥️ Terminal Portfolio

![Terminal Portfolio Preview](https://via.placeholder.com/1200x630/1e1e1e/00ff41?text=Terminal+Portfolio+Preview)

> **Your portfolio, reimagined as a command-line interface.** Explore my work, skills, and projects through an interactive terminal experience—no mouse required.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com)

## 📖 Overview

This project transforms the traditional portfolio website into a dynamic, immersive terminal experience. Visitors interact with my professional profile exactly like a real Unix terminal—typing commands to discover projects, GitHub stats, system information, and contact details. Built with performance and aesthetics in mind, it delivers a memorable first impression while showcasing technical depth.

✨ **Live Demo**: [https://anuragsite.vercel.app](https://anuragsite.vercel.app)

## ✨ Features

| Feature                       | Description                                                                                         |
| ----------------------------- | --------------------------------------------------------------------------------------------------- |
| 💻 **Authentic Terminal UI**  | Draggable/resizable terminal window with blinking cursor, command history, and tab completion       |
| ⌨️ **20+ Custom Commands**    | Explore portfolio via CLI: `about`, `projects`, `github`, `neofetch`, `weather`, `system`, and more |
| 🌓 **5 Built-in Themes**      | Switch themes instantly: `dark`, `light`, `matrix`, `solarized`, `dracula`                          |
| 📊 **Real-time Data**         | Live GitHub stats, weather API integration, and animated system monitor                             |
| 🌌 **Matrix Rain Background** | Canvas-based animated character rain with authentic terminal aesthetic                              |
| 📱 **Fully Responsive**       | Works seamlessly on desktop, tablet, and mobile devices                                             |
| ⚡ **Blazing Fast**           | Vite-powered build with <100ms initial load time                                                    |
| 🔒 **Privacy-First**          | Zero analytics trackers or third-party cookies                                                      |

## 🛠️ Tech Stack

| Category          | Technologies                                      |
| ----------------- | ------------------------------------------------- |
| **Core**          | React 19, TypeScript, Vite 7                      |
| **Styling**       | Tailwind CSS, Fira Code font                      |
| **State**         | Zustand (lightweight state management)            |
| **UI Components** | `react-draggable`, `re-resizable`, `lucide-react` |
| **APIs**          | GitHub REST API, OpenWeatherMap API               |
| **Tooling**       | ESLint, Prettier, TypeScript ESLint               |
| **Deployment**    | Vercel (static hosting)                           |

## 📂 Project Structure

```bash
anurag-xo-cli-portfolio/
├── src/
│   ├── commands/          # All terminal commands (about.tsx, projects.tsx, etc.)
│   ├── components/        # Reusable UI components (Terminal, Neofetch, etc.)
│   ├── data/              # Static data (user info, system stats)
│   ├── store/             # Theme state management (Zustand)
│   ├── styles/            # Theme definitions
│   ├── hooks/             # Custom hooks (useTypingEffect)
│   ├── utils/             # Command processor logic
│   └── types/             # TypeScript interfaces
├── public/                # Static assets
├── index.html             # Entry point
└── vite.config.ts         # Build configuration
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js v18+ (LTS recommended)
- npm v9+ or yarn v1.22+

### Local Development

```bash
# Clone the repository
git clone https://github.com/Anurag-xo/anurag-xo-cli-portfolio.git
cd anurag-xo-cli-portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Outputs optimized assets to the `dist/` directory.

## ▶️ Usage Guide

Once running, interact with the terminal just like a real CLI:

```bash
# View available commands
help

# Explore my background
about

# See my GitHub projects
projects

# Check live GitHub stats
github

# View system information (animated)
neofetch
system

# Change terminal theme
theme matrix    # Options: dark, light, matrix, solarized, dracula

# Get weather for any city
weather London

# Clear the screen
clear

# View command history
history
```

> 💡 **Pro Tip**: Press `Tab` for command auto-completion and `↑`/`↓` arrows to navigate history.

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# GitHub username (optional - defaults to "Anurag-xo")
VITE_GITHUB_USERNAME=Anurag-xo

# OpenWeatherMap API key (required for weather command)
VITE_OPENWEATHERMAP_API_KEY=your_api_key_here
```

> 🔑 Get your free OpenWeatherMap API key at [https://openweathermap.org/api](https://openweathermap.org/api)

## 📸 Screenshots

| Terminal Interface                                                                 | Neofetch Command                                                                 | Theme Switcher                                                                  |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img width="1851" height="931" alt="image" src="https://github.com/user-attachments/assets/1b453ff6-b507-446b-a39e-c8ac4ad3977e" /> | <img width="971" height="651" alt="image" src="https://github.com/user-attachments/assets/917ff868-b8d2-4c84-afbf-af74e66c48be" /> | (<img width="1851" height="930" alt="image" src="https://github.com/user-attachments/assets/e0351b74-b022-4e70-8458-b05ed54c8033" /> |


## 🧠 Roadmap

- [ ] Add `cat` command to view project source files
- [ ] Implement WebSocket-based live visitor counter
- [ ] Add ASCII art animations for special commands
- [ ] Integrate GitHub Contributions calendar visualization
- [ ] Add sound effects toggle (keyboard clicks, command execution)
- [ ] Create PWA support for installable terminal app

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

> 💡 Please ensure your code follows the existing TypeScript patterns and passes ESLint checks (`npm run lint`).

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for details.

## 👤 Author

**Anurag** — Full Stack Developer from India  
🔗 [Portfolio](https://anuragsite.vercel.app) | 💼 [LinkedIn](https://www.linkedin.com/in/anurag-kumar-b1a790249/) | 💻 [GitHub](https://github.com/Anurag-xo)

> _"The only way to do great work is to love what you do."_ — Steve Jobs

---

⭐ **Enjoyed this project?** Give it a star on GitHub to show your support!  
🐛 **Found a bug?** Open an [issue](https://github.com/Anurag-xo/anurag-xo-cli-portfolio/issues) with reproduction steps.
