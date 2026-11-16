import React, { useState } from 'react';

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
