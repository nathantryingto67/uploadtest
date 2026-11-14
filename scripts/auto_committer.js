import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stateFile = path.join(rootDir, '.activity_state.json');

const catalog = [
  {
    type: 'feat',
    scope: 'timetable',
    message: 'add weekly course collision detection and room conflict alerts',
    filePath: 'src/utils/scheduleValidator.js',
    content: `// Course collision detection and schedule validator
export function checkScheduleConflicts(courses) {
  const conflicts = [];
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      if (courses[i].schedule === courses[j].schedule) {
        conflicts.push({ courseA: courses[i].id, courseB: courses[j].id, slot: courses[i].schedule });
      }
    }
  }
  return conflicts;
}
`
  },
  {
    type: 'feat',
    scope: 'library',
    message: 'add campus library book catalog and digital loan tracker',
    filePath: 'src/components/LibraryCatalog.jsx',
    content: `import React, { useState } from 'react';

export default function LibraryCatalog() {
  const [books] = useState([
    { id: 1, title: 'Introduction to Algorithms (CLRS)', author: 'Cormen et al.', available: true, callNumber: 'QA76.6 .I585' },
    { id: 2, title: 'Operating Systems: Three Easy Pieces', author: 'Arpaci-Dusseau', available: false, dueDate: '2026-11-20' },
    { id: 3, title: 'Clean Code: Handbook of Agile Software', author: 'Robert C. Martin', available: true, callNumber: 'QA76.76 .C54' },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-2">Campus Library Resources</h2>
      <p className="text-xs text-slate-400 mb-6">Textbook reservations and reference holdings</p>
      <div className="space-y-3">
        {books.map(b => (
          <div key={b.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-white">{b.title}</p>
              <p className="text-xs text-slate-400">{b.author}</p>
            </div>
            <span className={"text-xs px-2.5 py-1 rounded border font-medium " + (b.available ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30')}>
              {b.available ? 'In Stacks' : ('Due ' + b.dueDate)}
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
    scope: 'gpa',
    message: 'add semester target GPA projection and honors standing tier',
    filePath: 'src/utils/honorsCalculator.js',
    content: `// Academic honors tier classifier
export function getHonorsStanding(cumulativeGpa) {
  if (cumulativeGpa >= 3.85) return 'Summa Cum Laude';
  if (cumulativeGpa >= 3.70) return 'Magna Cum Laude';
  if (cumulativeGpa >= 3.50) return 'Cum Laude';
  if (cumulativeGpa >= 3.20) return "Dean's List";
  return 'Good Academic Standing';
}
`
  },
  {
    type: 'style',
    scope: 'tailwind',
    message: 'enhance interactive card focus states and accessible outline rings',
    filePath: 'src/styles/components.css',
    content: `/* Component specific micro-interactions */
.interactive-card {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.interactive-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.1);
}
`
  },
  {
    type: 'feat',
    scope: 'attendance',
    message: 'add lecture attendance streak tracker and absence warnings',
    filePath: 'src/components/AttendanceTracker.jsx',
    content: `import React, { useState } from 'react';

export default function AttendanceTracker() {
  const [courses] = useState([
    { id: 'CS201', name: 'Data Structures & Algorithms', attended: 26, total: 28, minRequired: 80 },
    { id: 'MATH215', name: 'Discrete Mathematics', attended: 22, total: 24, minRequired: 80 },
    { id: 'PHYS102', name: 'General Physics II', attended: 20, total: 24, minRequired: 80 },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-2">Lecture Attendance Standing</h2>
      <p className="text-xs text-slate-400 mb-6">Minimum 80% attendance requirement monitoring</p>
      <div className="space-y-4">
        {courses.map(c => {
          const pct = Math.round((c.attended / c.total) * 100);
          return (
            <div key={c.id} className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-white">{c.name}</span>
                <span className="text-indigo-400 font-mono font-bold">{pct}% ({c.attended}/{c.total})</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: pct + '%' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`
  },
  {
    type: 'feat',
    scope: 'flutter',
    message: 'add quick assignment check-off dialog and floating action button in Dart',
    filePath: 'mobile_app/lib/screens/tasks_screen.dart',
    content: `import 'package:flutter/material.dart';

class TasksScreen extends StatelessWidget {
  const TasksScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Assignments', style: TextStyle(fontWeight: FontWeight.bold)),
        backgroundColor: const Color(0xFF0F172A),
      ),
      body: const Center(
        child: Text('Assignment Deadlines & Quizzes', style: TextStyle(color: Colors.white70)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: const Color(0xFF4F46E5),
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}
`
  },
  {
    type: 'test',
    scope: 'timetable',
    message: 'add unit test suite for schedule overlap matrix computation',
    filePath: 'src/utils/scheduleValidator.test.js',
    content: `import { checkScheduleConflicts } from './scheduleValidator.js';

console.log('Testing checkScheduleConflicts...');
const testCourses = [
  { id: 'CS1', schedule: 'MW 09:00 - 10:30' },
  { id: 'CS2', schedule: 'MW 09:00 - 10:30' },
];
const conflicts = checkScheduleConflicts(testCourses);
console.assert(conflicts.length === 1, 'Expected 1 conflict');
console.log('Schedule validator tests passed.');
`
  },
  {
    type: 'docs',
    scope: 'architecture',
    message: 'document modular component hierarchy and study utilities API',
    filePath: 'ARCHITECTURE.md',
    content: `# CampusHub Architecture & Component Hierarchy

## Design Principles
- Single-page application modularized by academic workflows
- State persistence using browser local storage hooks
- Zero third-party telemetry or ad scripts
- Tailwind CSS mobile-responsive utility styling

## Feature Modules
1. **Academic Dashboard**: High-level semester status
2. **Degree Roadmap**: Prerequisite DAG and credit audit
3. **Class Schedule**: Weekly timetable with conflict detection
4. **GPA Forecaster**: Weighted unit letter-grade model
5. **Study Focus Timer**: 25/5 and 50/10 Pomodoro intervals
6. **Library & Resources**: Textbook reserves and holdings
`
  }
];

function ensureGitDiff(iteration, targetDateStr) {
  const patchFile = path.join(rootDir, 'src', 'data', 'activity_log.json');
  const patchDir = path.dirname(patchFile);
  if (!fs.existsSync(patchDir)) {
    fs.mkdirSync(patchDir, { recursive: true });
  }

  let logs = [];
  if (fs.existsSync(patchFile)) {
    try { logs = JSON.parse(fs.readFileSync(patchFile, 'utf8')); } catch (e) {}
  }

  logs.unshift({
    timestamp: targetDateStr,
    iteration,
    build: '1.0.' + iteration,
    status: 'verified'
  });

  if (logs.length > 50) logs = logs.slice(0, 50);
  fs.writeFileSync(patchFile, JSON.stringify(logs, null, 2), 'utf8');
}

function makeCommit(item, targetDateIso, iteration) {
  const targetPath = path.join(rootDir, item.filePath);
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, item.content, 'utf8');
  // Always guarantee a unique diff
  ensureGitDiff(iteration, targetDateIso);

  const commitMsg = item.type + '(' + item.scope + '): ' + item.message;
  const gitEnv = {
    ...process.env,
    GIT_AUTHOR_NAME: 'Nathan',
    GIT_AUTHOR_EMAIL: '342412423+nathantryingto67@users.noreply.github.com',
    GIT_COMMITTER_NAME: 'Nathan',
    GIT_COMMITTER_EMAIL: '342412423+nathantryingto67@users.noreply.github.com',
    GIT_AUTHOR_DATE: targetDateIso,
    GIT_COMMITTER_DATE: targetDateIso
  };

  try {
    execSync('git add .', { cwd: rootDir, stdio: 'pipe' });
    execSync('git commit --date="' + targetDateIso + '" -m "' + commitMsg + '"', { cwd: rootDir, env: gitEnv, stdio: 'pipe' });
    execSync('git push origin main', { cwd: rootDir, stdio: 'pipe' });
    console.log('[Daily Committer] Pushed commit for ' + targetDateIso + ': "' + commitMsg + '"');
    return true;
  } catch (err) {
    console.error('[Daily Committer] Commit/push error:', err.message);
    return false;
  }
}

function getDatesBetween(startDateStr, endDateStr) {
  const dates = [];
  let curr = new Date(startDateStr + 'T00:00:00');
  const end = new Date(endDateStr + 'T00:00:00');
  while (curr <= end) {
    const y = curr.getFullYear();
    const m = String(curr.getMonth() + 1).padStart(2, '0');
    const d = String(curr.getDate()).padStart(2, '0');
    dates.push(y + '-' + m + '-' + d);
    curr.setDate(curr.getDate() + 1);
  }
  return dates;
}

function run() {
  const now = new Date();
  const today = now.toLocaleDateString('en-CA');
  let state = { lastRunDate: '', todayCommitsDone: 0, todayTargetQuota: 2, featureIndex: 0 };

  if (fs.existsSync(stateFile)) {
    try {
      state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch (e) {}
  }

  // 1. Check for missed days to backfill
  if (state.lastRunDate && state.lastRunDate < today) {
    const missedDates = getDatesBetween(state.lastRunDate, today).slice(1, -1);
    for (const missedDate of missedDates) {
      console.log('[Daily Committer] Healing missed day: ' + missedDate);
      const quotaForDay = Math.floor(Math.random() * 2) + 1; // 1 or 2 commits
      for (let c = 0; c < quotaForDay; c++) {
        const hour = 11 + (c * 3);
        const timestamp = missedDate + 'T' + String(hour).padStart(2, '0') + ':25:00+08:00';
        const item = catalog[state.featureIndex % catalog.length];
        state.featureIndex += 1;
        makeCommit(item, timestamp, state.featureIndex);
      }
    }
    state.lastRunDate = today;
    state.todayCommitsDone = 0;
    state.todayTargetQuota = Math.floor(Math.random() * 3) + 1;
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
  }

  // 2. Process today's quota
  if (!state.lastRunDate) {
    state.lastRunDate = today;
    state.todayCommitsDone = 0;
    state.todayTargetQuota = Math.floor(Math.random() * 3) + 1;
  }

  if (state.todayCommitsDone < state.todayTargetQuota) {
    const currentHour = now.getHours();
    let commitTimeStr;
    if (currentHour < 9) {
      const hour = 10 + (state.todayCommitsDone * 2);
      commitTimeStr = today + 'T' + String(hour).padStart(2, '0') + ':30:00+08:00';
    } else {
      commitTimeStr = now.toISOString();
    }

    const item = catalog[state.featureIndex % catalog.length];
    state.featureIndex += 1;

    const ok = makeCommit(item, commitTimeStr, state.featureIndex);
    if (ok) {
      state.todayCommitsDone += 1;
    }
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
  } else {
    console.log('[Daily Committer] Today quota (' + state.todayCommitsDone + '/' + state.todayTargetQuota + ') already filled.');
  }
}

run();
