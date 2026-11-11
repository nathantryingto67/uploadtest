---
description: Automatically check and fulfill today's GitHub commit quota when opening Antigravity
globs: ["*"]
---

# Daily Commit Quota Rule

When starting any conversation or turn in this workspace:
1. Check the daily commit quota by running:
   `node scripts/auto_committer.js`
2. If any commit was made or if the quota was already satisfied, briefly inform the user of today's status (e.g., "Daily contribution status: X/Y commits completed for today").
