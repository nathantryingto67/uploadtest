import React, { useState } from 'react';

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
