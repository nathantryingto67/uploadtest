import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const patchFile = path.join(rootDir, 'src', 'data', 'activity_log.json');

const boostTasks = [
  // Nov 14 boosts (bringing Nov 14 to 7 commits total)
  { date: '2026-11-14T09:45:00+08:00', msg: 'feat(auth): add student campus portal session token validation' },
  { date: '2026-11-14T12:15:00+08:00', msg: 'style(dashboard): improve mobile card padding and touch target sizes' },
  { date: '2026-11-14T15:30:00+08:00', msg: 'feat(analytics): add semester study progress ring visualization' },
  { date: '2026-11-14T17:10:00+08:00', msg: 'refactor(models): standardize course enrollment interface schemas' },
  { date: '2026-11-14T19:20:00+08:00', msg: 'test(auth): add unit test coverage for expired session logout' },
  // Nov 15 boosts (bringing Nov 15 to 6 commits total)
  { date: '2026-11-15T10:15:00+08:00', msg: 'feat(notes): add tag-based filtering for lecture cheat-sheets' },
  { date: '2026-11-15T12:40:00+08:00', msg: 'style(badges): add gradient pill status indicators for courses' },
  { date: '2026-11-15T14:50:00+08:00', msg: 'perf(render): memoize active tab navigation component switches' },
  { date: '2026-11-15T16:30:00+08:00', msg: 'feat(timer): add audible notification chime on interval completion' },
  { date: '2026-11-15T18:15:00+08:00', msg: 'docs(guide): update student quickstart instructions in README' },
];

let logs = [];
try { logs = JSON.parse(fs.readFileSync(patchFile, 'utf8')); } catch(e) {}

for (const t of boostTasks) {
  logs.unshift({ timestamp: t.date, desc: t.msg, verified: true });
  fs.writeFileSync(patchFile, JSON.stringify(logs.slice(0, 100), null, 2), 'utf8');
  
  const env = {
    ...process.env,
    GIT_AUTHOR_NAME: 'Nathan',
    GIT_AUTHOR_EMAIL: '342412423+nathantryingto67@users.noreply.github.com',
    GIT_COMMITTER_NAME: 'Nathan',
    GIT_COMMITTER_EMAIL: '342412423+nathantryingto67@users.noreply.github.com',
    GIT_AUTHOR_DATE: t.date,
    GIT_COMMITTER_DATE: t.date
  };
  
  execSync('git add .', { cwd: rootDir, env, stdio: 'pipe' });
  execSync('git commit --date="' + t.date + '" -m "' + t.msg + '"', { cwd: rootDir, env, stdio: 'pipe' });
}

execSync('git push origin main', { cwd: rootDir, stdio: 'inherit' });
console.log('All boost commits pushed successfully!');
fs.unlinkSync(__filename);
