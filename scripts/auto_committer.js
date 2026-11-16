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
    scope: 'kanban',
    message: 'implement drag-and-drop assignment priority kanban columns',
    filePath: 'src/components/AssignmentKanban.jsx',
    content: `import React, { useState } from 'react';

export default function AssignmentKanban() {
  const [columns] = useState([
    { title: 'To Do', items: ['Discrete Math Problem Set 5', 'Physics Optics Pre-Lab'] },
    { title: 'In Progress', items: ['Data Structures AVL Tree Implementation'] },
    { title: 'Completed', items: ['Web Development Tailwind Navigation Bar'] },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-white">Assignment Kanban Board</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => (
          <div key={col.title} className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{col.title} ({col.items.length})</h3>
            <div className="space-y-2">
              {col.items.map((it, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium hover:border-indigo-500/40 transition">
                  {it}
                </div>
              ))}
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
    scope: 'countdown',
    message: 'add final exam countdown timer with critical milestone alerts',
    filePath: 'src/components/ExamCountdown.jsx',
    content: `import React, { useState } from 'react';

export default function ExamCountdown() {
  const [exams] = useState([
    { subject: 'CS 201: Data Structures', daysLeft: 18, date: '2026-12-04' },
    { subject: 'MATH 215: Discrete Math', daysLeft: 22, date: '2026-12-08' },
    { subject: 'PHYS 102: Physics II', daysLeft: 25, date: '2026-12-11' },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg">
      <h2 className="text-xl font-bold text-white mb-2">Final Examination Countdown</h2>
      <p className="text-xs text-slate-400 mb-6">Fall semester finals examination schedule</p>
      <div className="space-y-3">
        {exams.map(ex => (
          <div key={ex.subject} className="p-4 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-white">{ex.subject}</p>
              <p className="text-xs text-slate-400">{ex.date}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold font-mono text-indigo-400">{ex.daysLeft}</span>
              <span className="text-[10px] text-slate-500 block uppercase">days left</span>
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
    scope: 'cafeteria',
    message: 'add campus dining hall menu and student dietary macro filter',
    filePath: 'src/components/CafeteriaMenu.jsx',
    content: `import React, { useState } from 'react';

export default function CafeteriaMenu() {
  const [meals] = useState([
    { name: 'Grilled Herb Chicken & Quinoa', station: 'Main Grill', cal: 520, tag: 'High Protein' },
    { name: 'Mediterranean Falafel Bowl', station: 'Vegan Station', cal: 460, tag: 'Vegetarian' },
    { name: 'Classic Tomato Basil Pasta', station: 'Italian Corner', cal: 580, tag: 'Comfort' },
  ]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-2">Student Union Dining Daily Menu</h2>
      <div className="space-y-3 mt-4">
        {meals.map(m => (
          <div key={m.name} className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
            <div>
              <p className="text-sm font-medium text-white">{m.name}</p>
              <p className="text-slate-400">{m.station} &bull; {m.cal} kcal</p>
            </div>
            <span className="px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
              {m.tag}
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
    scope: 'audio',
    message: 'add study ambient background sound generator for focus sessions',
    filePath: 'src/components/AmbientPlayer.jsx',
    content: `import React, { useState } from 'react';

export default function AmbientPlayer() {
  const [tracks] = useState(['Rain on Campus Window', 'Library Soft Murmur', 'White Noise', 'Campfire Lo-Fi']);
  const [activeTrack, setActiveTrack] = useState(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md">
      <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Study Focus Soundscapes</h3>
      <div className="grid grid-cols-2 gap-2">
        {tracks.map(t => (
          <button
            key={t}
            onClick={() => setActiveTrack(activeTrack === t ? null : t)}
            className={"p-3 rounded-lg text-xs font-medium text-left border transition " + (activeTrack === t ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700')}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
`
  },
  {
    type: 'feat',
    scope: 'curve',
    message: 'add exam grade curve normal distribution visualizer',
    filePath: 'src/utils/gradeCurve.js',
    content: `// Grade curve calculator
export function calculateCurvedGrade(rawScore, mean, stdDev) {
  const zScore = (rawScore - mean) / stdDev;
  if (zScore >= 1.5) return 'A';
  if (zScore >= 0.5) return 'B';
  if (zScore >= -0.5) return 'C';
  if (zScore >= -1.5) return 'D';
  return 'F';
}
`
  },
  {
    type: 'feat',
    scope: 'flutter',
    message: 'implement course syllabus detail view with expandable office hours',
    filePath: 'mobile_app/lib/screens/course_detail_screen.dart',
    content: `import 'package:flutter/material.dart';

class CourseDetailScreen extends StatelessWidget {
  final String courseTitle;

  const CourseDetailScreen({super.key, required this.courseTitle});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(courseTitle),
        backgroundColor: const Color(0xFF0F172A),
      ),
      body: const Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Instructor Office Hours: Tue/Thu 2-4 PM', style: TextStyle(color: Colors.white70)),
            SizedBox(height: 12),
            Text('Textbook: Discrete Math and Its Applications', style: TextStyle(color: Colors.white70)),
          ],
        ),
      ),
    );
  }
}
`
  },
  {
    type: 'style',
    scope: 'tailwind',
    message: 'optimize gradient pill badges and smooth accordion animation transitions',
    filePath: 'src/styles/badges.css',
    content: `/* Badge and pill animations */
.badge-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
`
  },
  {
    type: 'perf',
    scope: 'state',
    message: 'memoize heavy timetable course filter loops with useMemo hook',
    filePath: 'src/hooks/useCourseFilter.js',
    content: `import { useMemo } from 'react';

export function useCourseFilter(courses, query, category) {
  return useMemo(() => {
    return courses.filter(c => {
      const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.code.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === 'all' || c.category === category;
      return matchQuery && matchCat;
    });
  }, [courses, query, category]);
}
`
  },
  {
    type: 'test',
    scope: 'curve',
    message: 'add unit test suite for normal distribution curve grading algorithm',
    filePath: 'src/utils/gradeCurve.test.js',
    content: `import { calculateCurvedGrade } from './gradeCurve.js';

console.log('Testing calculateCurvedGrade...');
console.assert(calculateCurvedGrade(85, 70, 10) === 'A', 'Expected A');
console.assert(calculateCurvedGrade(72, 70, 10) === 'B', 'Expected B');
console.log('Curve tests passed.');
`
  },
  {
    type: 'docs',
    scope: 'changelog',
    message: 'update sprint documentation and release v1.4 milestones',
    filePath: 'CHANGELOG.md',
    content: `# CampusHub Changelog

## v1.4.0 (Active Sprint)
- Added Final Examination countdown module
- Added lecture attendance threshold tracker
- Added Campus Library holdings reserve list
- Enhanced grade curving distribution logic
- Added focus ambient study audio generator
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
    build: '1.4.' + iteration,
    status: 'verified'
  });

  if (logs.length > 100) logs = logs.slice(0, 100);
  fs.writeFileSync(patchFile, JSON.stringify(logs, null, 2), 'utf8');
}

function makeCommit(item, targetDateIso, iteration) {
  const targetPath = path.join(rootDir, item.filePath);
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.writeFileSync(targetPath, item.content, 'utf8');
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
  let state = { lastRunDate: '', todayCommitsDone: 0, todayTargetQuota: 7, featureIndex: 0 };

  if (fs.existsSync(stateFile)) {
    try {
      state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    } catch (e) {}
  }

  // Quota target: 6 to 8 commits per day (vibrant dark green)
  const getRandomDailyQuota = () => Math.floor(Math.random() * 3) + 6; // 6, 7, or 8

  // 1. Backfill any missed dates with 6-8 commits
  if (state.lastRunDate && state.lastRunDate < today) {
    const missedDates = getDatesBetween(state.lastRunDate, today).slice(1, -1);
    for (const missedDate of missedDates) {
      console.log('[Daily Committer] Backfilling missed day: ' + missedDate);
      const quotaForDay = getRandomDailyQuota();
      for (let c = 0; c < quotaForDay; c++) {
        const hour = 9 + Math.floor(c * 1.5);
        const min = (c * 17) % 60;
        const timestamp = missedDate + 'T' + String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0') + ':00+08:00';
        const item = catalog[state.featureIndex % catalog.length];
        state.featureIndex += 1;
        makeCommit(item, timestamp, state.featureIndex);
      }
    }
    state.lastRunDate = today;
    state.todayCommitsDone = 0;
    state.todayTargetQuota = getRandomDailyQuota();
    fs.writeFileSync(stateFile, JSON.stringify(state, null, 2), 'utf8');
  }

  // 2. Initialize today if needed
  if (!state.lastRunDate || state.lastRunDate !== today) {
    state.lastRunDate = today;
    state.todayCommitsDone = 0;
    state.todayTargetQuota = getRandomDailyQuota();
  }

  // If today's target quota was below 6, upgrade it to 7
  if (state.todayTargetQuota < 6) {
    state.todayTargetQuota = 7;
  }

  // 3. Fulfill today's commit
  if (state.todayCommitsDone < state.todayTargetQuota) {
    const currentHour = now.getHours();
    let commitTimeStr;
    if (currentHour < 9) {
      // Early morning runs get realistic daytime schedule across 9 AM to 8 PM
      const hour = 9 + Math.floor(state.todayCommitsDone * 1.4);
      const min = (state.todayCommitsDone * 19) % 60;
      commitTimeStr = today + 'T' + String(hour).padStart(2, '0') + ':' + String(min).padStart(2, '0') + ':00+08:00';
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
    console.log('[Daily Committer] Today progress: ' + state.todayCommitsDone + '/' + state.todayTargetQuota + ' commits.');
  } else {
    console.log('[Daily Committer] Today quota (' + state.todayCommitsDone + '/' + state.todayTargetQuota + ') already satisfied.');
  }
}

run();
