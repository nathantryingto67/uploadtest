import React, { useState } from 'react';

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