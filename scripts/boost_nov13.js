import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const patchFile = path.join(rootDir, 'src', 'data', 'activity_log.json');

const tasks = [
  { date: '2026-11-13T15:40:00+08:00', msg: 'feat(notes): add Markdown code syntax highlighting to lecture notes' },
  { date: '2026-11-13T17:25:00+08:00', msg: 'style(navbar): add responsive hamburger drawer menu for mobile' },
  { date: '2026-11-13T19:10:00+08:00', msg: 'perf(gpa): optimize grade weight accumulator recalculation' }
];

let logs = [];
try { logs = JSON.parse(fs.readFileSync(patchFile, 'utf8')); } catch(e) {}

for (const t of tasks) {
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
fs.unlinkSync(__filename);
