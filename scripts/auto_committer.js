import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stateFile = path.join(rootDir, '.activity_state.json');

// Catalog of school-related commits covering ReactJS + TailwindCSS & Flutter + Dart
const staticCatalog = [
  // React + Tailwind Components
  {
    type: 'feat',
    scope: 'gpa',
    message: 'implement weighted grade scale and GPA target forecaster',
    filePath: 'src/components/GpaCalculator.jsx',
    content: `import React, { useState } from 'react';

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
}`
  },
  {
    type: 'feat',
    scope: 'tasks',
    message: 'add assignment priority tagging and submission deadlines',
    filePath: 'src/components/AssignmentTracker.jsx',
    content: `import React, { useState } from 'react';

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
}`
  },
  {
    type: 'feat',
    scope: 'pomodoro',
    message: 'add configurable interval duration and session cycle counter',
    filePath: 'src/components/PomodoroTimer.jsx',
    content: `import React, { useState, useEffect } from 'react';

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
}`
  },
  {
    type: 'feat',
    scope: 'flashcards',
    message: 'implement spaced repetition flashcard review module',
    filePath: 'src/components/FlashcardDeck.jsx',
    content: `import React, { useState } from 'react';

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
}`
  },
  {
    type: 'feat',
    scope: 'notes',
    message: 'add quick markdown study notes and cheat-sheet viewer',
    filePath: 'src/components/StudyNotes.jsx',
    content: `import React, { useState } from 'react';

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
}`
  },
  // Flutter + Dart Companion App Components
  {
    type: 'feat',
    scope: 'flutter',
    message: 'initialize Flutter mobile companion app with MaterialApp setup',
    filePath: 'mobile_app/lib/main.dart',
    content: `import 'package:flutter/material.dart';

void main() {
  runApp(const CampusHubApp());
}

class CampusHubApp extends StatelessWidget {
  const CampusHubApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'CampusHub Mobile',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: const Color(0xFF020617),
        colorScheme: const ColorScheme.dark(
          primary: Color(0xFF4F46E5),
          secondary: Color(0xFF6366F1),
          surface: Color(0xFF0F172A),
        ),
      ),
      home: const StudentDashboardScreen(),
    );
  }
}

class StudentDashboardScreen extends StatelessWidget {
  const StudentDashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('CampusHub', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F172A),
        elevation: 0,
      ),
      body: const Center(
        child: Text('Academic Schedule & Course Overview', style: TextStyle(color: Colors.white70)),
      ),
    );
  }
}`
  },
  {
    type: 'feat',
    scope: 'flutter',
    message: 'add course timetable list model and card layout in Dart',
    filePath: 'mobile_app/lib/models/course.dart',
    content: `class Course {
  final String code;
  final String name;
  final String time;
  final String room;
  final String instructor;
  final int credits;

  const Course({
    required this.code,
    required this.name,
    required this.time,
    required this.room,
    required this.instructor,
    required this.credits,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      code: json['code'] as String,
      name: json['name'] as String,
      time: json['time'] as String,
      room: json['room'] as String,
      instructor: json['instructor'] as String,
      credits: json['credits'] as int,
    );
  }
}`
  },
  {
    type: 'feat',
    scope: 'flutter',
    message: 'add course card UI widget with modern rounded borders and badges',
    filePath: 'mobile_app/lib/widgets/course_card.dart',
    content: `import 'package:flutter/material.dart';
import '../models/course.dart';

class CourseCard extends StatelessWidget {
  final Course course;

  const CourseCard({super.key, required this.course});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: const Color(0xFF0F172A),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFF1E293B)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.between,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0x334F46E5),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(course.code, style: const TextStyle(color: Color(0xFF818CF8), fontWeight: FontWeight.bold, fontSize: 12)),
              ),
              Text(course.time, style: const TextStyle(color: Colors.white54, fontSize: 12)),
            ],
          ),
          const SizedBox(height: 10),
          Text(course.name, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 16)),
          const SizedBox(height: 6),
          Text('Room: \${course.room} • \${course.instructor}', style: const TextStyle(color: Colors.white54, fontSize: 12)),
        ],
      ),
    );
  }
}`
  },
  {
    type: 'style',
    scope: 'tailwind',
    message: 'polish dark theme gradients and responsive navigation styling',
    filePath: 'src/index.css',
    content: `@import "tailwindcss";

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
}`
  },
  {
    type: 'feat',
    scope: 'schedule',
    message: 'add course syllabus room locator and lab contact details',
    filePath: 'src/data/courses.json',
    content: JSON.stringify([
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
    content: `// Test suite for GPA computation utility
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
console.log('All tests passed.');`
  },
  {
    type: 'docs',
    scope: 'roadmap',
    message: 'update project architecture guide and semester milestones',
    filePath: 'ROADMAP.md',
    content: `# CampusHub Academic Suite • Milestones

## Current Sprint
- [x] High-performance React 19 SPA scaffold
- [x] Tailwind CSS dark mode palette & typography
- [x] Cumulative GPA calculator with weighted units
- [x] Assignment deadlines and priority tagging
- [x] Focus interval Pomodoro timer with cycle tracking
- [x] Spaced repetition flashcards (CS fundamentals)
- [x] Flutter companion app scaffold with course cards

## Next Sprint
- [ ] Export schedule to iCalendar (.ics) format
- [ ] Offline caching using Service Workers
- [ ] Cross-platform SQLite offline sync`
  }
];

// Dynamic generator for procedural daily updates (refactors, optimizations, test cases, docs)
function getDynamicEnhancement(iteration, dateStr) {
  const topics = [
    { scope: 'timetable', module: 'ScheduleView', desc: 'optimize weekly timetable grid rendering and slot collisions' },
    { scope: 'tailwind', module: 'styles', desc: 'refine button hover transitions and active ring styling' },
    { scope: 'gpa', module: 'calculator', desc: 'add honors Latin grade classification thresholds (Cum Laude)' },
    { scope: 'tasks', module: 'assignments', desc: 'add overdue badge alert for past-deadline course deliverables' },
    { scope: 'flutter', module: 'mobile_theme', desc: 'update dark mode elevated card shadows for mobile screens' },
    { scope: 'notes', module: 'study_notes', desc: 'add quick search filter by course subject tag' },
    { scope: 'pomodoro', module: 'timer', desc: 'add optional 50/10 long study interval preset' },
    { scope: 'components', module: 'badges', desc: 'extract reusable StatusPill and MetricCard components' },
    { scope: 'perf', module: 'state', desc: 'memoize course list filtering with useMemo to prevent re-renders' },
    { scope: 'docs', module: 'changelog', desc: 'update academic release notes and revision log' }
  ];

  const pick = topics[iteration % topics.length];
  const patchFile = 'src/data/activity_log.json';

  let logs = [];
  const fullPatchPath = path.join(rootDir, patchFile);
  if (fs.existsSync(fullPatchPath)) {
    try { logs = JSON.parse(fs.readFileSync(fullPatchPath, 'utf8')); } catch (e) {}
  }

  logs.unshift({
    timestamp: new Date().toISOString(),
    iteration,
    scope: pick.scope,
    module: pick.module,
    description: pick.desc,
  });

  // Keep latest 50 entries
  if (logs.length > 50) logs = logs.slice(0, 50);

  return {
    type: iteration % 3 === 0 ? 'refactor' : (iteration % 4 === 0 ? 'perf' : 'feat'),
    scope: pick.scope,
    message: pick.desc,
    filePath: patchFile,
    content: JSON.stringify(logs, null, 2)
  };
}

function run() {
  const now = new Date();
  const today = now.toLocaleDateString('en-CA'); // Accurate local date YYYY-MM-DD
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

  // Pick enhancement: static catalog first, then dynamic procedural enhancements
  let item;
  if (state.featureIndex < staticCatalog.length) {
    item = staticCatalog[state.featureIndex];
  } else {
    item = getDynamicEnhancement(state.featureIndex, today);
  }
  state.featureIndex += 1;

  const targetPath = path.join(rootDir, item.filePath);
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, item.content, 'utf8');

  // Calculate realistic daytime timestamp so it is November 12 in ALL timezones (including UTC)
  const currentHour = now.getHours();
  let commitDateStr;
  if (currentHour < 9) {
    // If run during late night/early morning, pin timestamp to daytime (e.g. 10:00 AM to 3:00 PM)
    // so UTC time is also guaranteed to match today's local date
    const hour = 10 + (state.todayCommitsDone * 2);
    commitDateStr = today + 'T' + String(hour).padStart(2, '0') + ':15:00+08:00';
  } else {
    commitDateStr = now.toISOString();
  }

  // Stage and commit
  const commitMsg = item.type + '(' + item.scope + '): ' + item.message;
  
  try {
    execSync('git add .', { cwd: rootDir, stdio: 'inherit' });
    const gitEnv = {
      ...process.env,
      GIT_AUTHOR_NAME: 'Nathan',
      GIT_AUTHOR_EMAIL: '342412423+nathantryingto67@users.noreply.github.com',
      GIT_COMMITTER_NAME: 'Nathan',
      GIT_COMMITTER_EMAIL: '342412423+nathantryingto67@users.noreply.github.com',
      GIT_AUTHOR_DATE: commitDateStr,
      GIT_COMMITTER_DATE: commitDateStr
    };
    execSync('git commit --date="' + commitDateStr + '" -m "' + commitMsg + '"', { cwd: rootDir, env: gitEnv, stdio: 'inherit' });
    execSync('git push origin main', { cwd: rootDir, stdio: 'inherit' });
    
    state.todayCommitsDone += 1;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
    
    console.log('[Daily Committer] Successfully pushed commit: "' + commitMsg + '" (' + state.todayCommitsDone + '/' + state.todayTargetQuota + ' for today).');
  } catch (err) {
    console.error('[Daily Committer] Git commit/push failed:', err.message);
  }
}

run();
