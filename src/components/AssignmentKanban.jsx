import React, { useState } from 'react';

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
