import React, { useState } from 'react';

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
