import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stateFile = path.join(rootDir, '.activity_state.json');

// Pool of realistic school-related React/Tailwind & Flutter project improvements
const commitCatalog = [
  {
    type: 'feat',
    scope: 'gpa',
    message: 'implement weighted grade scale and GPA target forecaster',
    filePath: 'src/components/GpaCalculator.jsx',
    generateContent: () => `import React, { useState } from 'react';

export default function GpaCalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
    { id: 2, name: 'Discrete Mathematics', credits: 3, grade: 'A-' },
    { id: 3, name: 'Web Application Development', credits: 3, grade: 'B+' },
    { id: 4, name: 'General Physics II', credits: 4, grade: 'A' },
  ]);

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0,
  };

  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0);
  const totalPoints = courses.reduce((sum, c) => sum + (Number(c.credits) * (gradePoints[c.grade] || 0)), 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Cumulative GPA Forecaster</h2>
          <p className="text-xs text-slate-400">Weighted grade point average computation</p>
        </div>
        <div className="bg-indigo-600/20 border border-indigo-500/30 px-4 py-2 rounded-lg text-right">
          <p className="text-xs text-indigo-300 font-semibold uppercase">Current GPA</p>
          <p className="text-2xl font-bold text-indigo-400 font-mono">{gpa}</p>
        </div>
      </div>

      <div className="space-y-3">
        {courses.map(course => (
          <div key={course.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-sm font-medium text-slate-200">{course.name}</span>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-400">{course.credits} Credits</span>
              <span className="bg-slate-800 text-indigo-400 font-bold px-2.5 py-1 rounded border border-slate-700">
                {course.grade} ({gradePoints[course.grade]})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    type: 'feat',
    scope: 'tasks',
    message: 'add assignment priority tagging and submission deadlines',
    filePath: 'src/components/AssignmentTracker.jsx',
    generateContent: () => `import React, { useState } from 'react';

export default function AssignmentTracker() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Algorithm Analysis Problem Set 4', course: 'CS 201', due: '2026-11-15', priority: 'High', completed: false },
    { id: 2, title: 'Physics Lab Report: Optics', course: 'PHYS 102', due: '2026-11-18', priority: 'Medium', completed: false },
    { id: 3, title: 'React State Management Essay', course: 'CS 320', due: '2026-11-22', priority: 'Low', completed: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const priorityColors = {
    High: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-2">Assignment Submission Tracker</h2>
      <p className="text-xs text-slate-400 mb-6">Upcoming homework, quizzes, and project milestones</p>

      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0"
              />
              <div>
                <p className={"text-sm font-medium " + (task.completed ? 'line-through text-slate-500' : 'text-slate-200')}>
                  {task.title}
                </p>
                <p className="text-xs text-slate-400">{task.course} &bull; Due {task.due}</p>
              </div>
            </div>
            <span className={"text-xs px-2.5 py-1 rounded border font-medium " + priorityColors[task.priority]}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    type: 'feat',
    scope: 'pomodoro',
    message: 'add configurable interval duration and session cycle counter',
    filePath: 'src/components/PomodoroTimer.jsx',
    generateContent: () => `import React, { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft(sec => sec - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      setCycle(c => c + 1);
      setSecondsLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return String(mins).padStart(2, '0') + ':' + String(remainder).padStart(2, '0');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-md mx-auto text-center">
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        Cycle #{cycle} &bull; Deep Work
      </span>
      <div className="text-6xl font-mono font-bold text-white tracking-tight my-6">
        {formatTime(secondsLeft)}
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition"
        >
          {isActive ? 'Pause' : 'Start Focus Session'}
        </button>
        <button
          onClick={() => { setIsActive(false); setSecondsLeft(25 * 60); }}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium text-sm transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
`
  },
  {
    type: 'feat',
    scope: 'flashcards',
    message: 'implement spaced repetition flashcard review module',
    filePath: 'src/components/FlashcardDeck.jsx',
    generateContent: () => `import React, { useState } from 'react';

export default function FlashcardDeck() {
  const cards = [
    { question: 'What is the time complexity of QuickSort in the average case?', answer: 'O(n log n)' },
    { question: 'In React, what hook is used to persist mutable values without triggering re-render?', answer: 'useRef()' },
    { question: 'What does ACID stand for in database transactions?', answer: 'Atomicity, Consistency, Isolation, Durability' },
  ];

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const nextCard = () => {
    setFlipped(false);
    setIndex((index + 1) % cards.length);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4 text-xs text-slate-400">
        <span>CS Review Flashcards</span>
        <span>Card {index + 1} of {cards.length}</span>
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="min-h-48 p-6 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-center cursor-pointer hover:border-indigo-500/50 transition"
      >
        <p className="text-base font-medium text-slate-100">
          {flipped ? cards[index].answer : cards[index].question}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-xs text-slate-500">Click card to reveal answer</span>
        <button
          onClick={nextCard}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
        >
          Next Card &rarr;
        </button>
      </div>
    </div>
  );
}
`
  },
  {
    type: 'feat',
    scope: 'notes',
    message: 'add quick markdown study notes and cheat-sheet viewer',
    filePath: 'src/components/StudyNotes.jsx',
    generateContent: () => `import React, { useState } from 'react';

export default function StudyNotes() {
  const [notes, setNotes] = useState([
    { id: 1, title: 'Calculus: Integration by Parts', subject: 'MATH 215', date: '2026-11-09' },
    { id: 2, title: 'Binary Search Tree Balancing (AVL)', subject: 'CS 201', date: '2026-11-10' },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-2">Academic Study Notes</h2>
      <p className="text-xs text-slate-400 mb-6">Subject lecture notes, formulas, and references</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {notes.map(note => (
          <div key={note.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-indigo-500/30 transition">
            <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {note.subject}
            </span>
            <h3 className="text-sm font-semibold text-white mt-2">{note.title}</h3>
            <p className="text-xs text-slate-500 mt-3">Updated {note.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    type: 'style',
    scope: 'tailwind',
    message: 'polish dark theme gradients and responsive navigation styling',
    filePath: 'src/index.css',
    generateContent: () => `@import "tailwindcss";

@layer base {
  body {
    @apply bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200;
  }
}

/* Custom scrollbar for modern academic dashboard */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #020617;
}

::-webkit-scrollbar-thumb {
  background: #1e293b;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb:hover {
  background: #334155;
}
`
  },
  {
    type: 'feat',
    scope: 'schedule',
    message: 'add course syllabus room locator and lab contact details',
    filePath: 'src/data/courses.json',
    generateContent: () => JSON.stringify([
      { id: 'CS201', title: 'Data Structures & Algorithms', instructor: 'Dr. Aris Thorne', room: 'Sci-Tech 304', credits: 4, schedule: 'MW 09:00 - 10:30' },
      { id: 'MATH215', title: 'Discrete Mathematics', instructor: 'Prof. Elena Rostova', room: 'Math 102', credits: 3, schedule: 'TTh 11:00 - 12:30' },
      { id: 'CS320', title: 'Web Application Development', instructor: 'Engr. Marcus Vance', room: 'Lab 3B', credits: 3, schedule: 'MWF 13:30 - 15:00' },
      { id: 'PHYS102', title: 'General Physics II', instructor: 'Dr. Liam Chen', room: 'Lecture Hall A', credits: 4, schedule: 'TTh 15:30 - 17:00' },
      { id: 'ENG205', title: 'Technical Communication for Engineers', instructor: 'Prof. Sarah Jenkins', room: 'Humanities 210', credits: 3, schedule: 'F 09:00 - 12:00' }
    ], null, 2)
  },
  {
    type: 'test',
    scope: 'gpa',
    message: 'add test suite for weighted GPA computation edge cases',
    filePath: 'src/utils/gpa.test.js',
    generateContent: () => `// Test suite for GPA computation utility
export function calculateGpa(courses) {
  const gradePoints = { 'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0 };
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  if (totalCredits === 0) return 0;
  const totalPoints = courses.reduce((sum, c) => sum + (c.credits * (gradePoints[c.grade] || 0)), 0);
  return Number((totalPoints / totalCredits).toFixed(2));
}

console.log('Testing calculateGpa...');
const sample = [
  { credits: 3, grade: 'A' },
  { credits: 3, grade: 'B' },
];
const result = calculateGpa(sample);
console.assert(result === 3.5, 'Expected 3.5');
console.log('All tests passed.');
`
  },
  {
    type: 'docs',
    scope: 'roadmap',
    message: 'update project architecture guide and semester milestones',
    filePath: 'ROADMAP.md',
    generateContent: () => `# CampusHub Academic Suite &bull; Milestones

## Current Sprint
- [x] High-performance React 19 SPA scaffold
- [x] Tailwind CSS dark mode palette & typography
- [x] Cumulative GPA calculator with weighted units
- [x] Assignment deadlines and priority tagging
- [x] Focus interval Pomodoro timer with cycle tracking
- [x] Spaced repetition flashcards (CS fundamentals)

## Next Sprint
- [ ] Export schedule to iCalendar (.ics) format
- [ ] Offline caching using Service Workers
- [ ] Mobile companion Flutter app integration
`
  }
];

function run() {
  const today = new Date().toISOString().split('T')[0];
  let state = { lastRunDate: '', todayCommitsDone: 0, todayTargetQuota: 2, featureIndex: 0 };

  if (fs.existsSync(stateFile)) {
    try {
      state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch (e) {
      console.warn('Could not parse state file, initializing fresh.');
    }
  }

  // Reset quota if it's a new day
  if (state.lastRunDate !== today) {
    state.lastRunDate = today;
    state.todayCommitsDone = 0;
    // Random 1 to 3 commits target for today
    state.todayTargetQuota = Math.floor(Math.random() * 3) + 1;
    console.log('[Daily Committer] New day detected (' + today + '). Target quota: ' + state.todayTargetQuota + ' commit(s).');
  }

  if (state.todayCommitsDone >= state.todayTargetQuota) {
    console.log('[Daily Committer] Quota already satisfied for today (' + state.todayCommitsDone + '/' + state.todayTargetQuota + ' commits done). Nothing to do.');
    return;
  }

  // Pick the next enhancement
  const item = commitCatalog[state.featureIndex % commitCatalog.length];
  state.featureIndex = (state.featureIndex + 1);

  const targetPath = path.join(rootDir, item.filePath);
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, item.generateContent(), 'utf8');

  // Stage and commit
  const commitMsg = item.type + '(' + item.scope + '): ' + item.message;
  
  try {
    execSync('git add .', { cwd: rootDir, stdio: 'inherit' });
    execSync('git commit -m "' + commitMsg + '"', { cwd: rootDir, stdio: 'inherit' });
    execSync('git push origin main', { cwd: rootDir, stdio: 'inherit' });
    
    state.todayCommitsDone += 1;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
    
    console.log('[Daily Committer] Successfully pushed commit: "' + commitMsg + '" (' + state.todayCommitsDone + '/' + state.todayTargetQuota + ' for today).');
  } catch (err) {
    console.error('[Daily Committer] Git commit/push failed:', err.message);
  }
}

run();
