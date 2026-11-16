import React, { useState } from 'react';

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
