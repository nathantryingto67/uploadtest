# CampusHub &bull; Student Workspace & Utility Suite

A modern academic portal and productivity suite built with **React** and **Tailwind CSS**. Designed to streamline class timetables, GPA computation, assignment deadlines, and focused study sessions in one unified workspace.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-6.0-646cff?logo=vite)
![Status](https://img.shields.io/badge/Build-Passing-emerald)

---

## Features

- **Degree Audit & Roadmap**: Interactive 4-year curriculum planner with credit milestones, prerequisite verification, and degree completion progress.
- **Academic Dashboard**: High-level snapshot of enrolled courses, cumulative GPA progress, upcoming deadlines, and study hours.
- **Weekly Timetable Planner**: Dynamic schedule viewer organizing classes, lecture hall locations, and meeting slots.
- **GPA & Grade Forecaster**: Interactive calculator supporting weighted credit units, letter grades, and target GPA simulations.
- **Assignment & Submission Tracker**: Priority-based task manager with due date tracking and course tags.
- **Pomodoro Study Timer**: Built-in interval timer with customizable focus cycles and break alerts.

---

## Tech Stack

- **Frontend**: React 19 (Hooks, Context, Modular Components)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React

---

## Getting Started

### Prerequisites

- Node.js (v18.0 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nathantryingto67/uploadtest.git

# Navigate to project directory
cd uploadtest

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Project Structure

```text
├── src/
│   ├── components/      # UI components & feature modules
│   ├── data/            # Course schedules & mock data
│   ├── hooks/           # Custom React hooks (timers, local storage)
│   ├── App.jsx          # Primary application layout & tab routing
│   ├── index.css        # Tailwind CSS imports & global styles
│   └── main.jsx         # Application entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies & project scripts
```

---

## Roadmap

- [x] Initial workspace scaffold with modular tab navigation
- [ ] Implement interactive GPA grade weighting calculation engine
- [ ] Add local storage persistence for custom course schedules
- [ ] Add sound notifications and custom cycle durations to Pomodoro timer
- [ ] Export semester summary reports in JSON / Markdown

---

## License

MIT License &copy; 2026 Nathan (nathantryingto67).
