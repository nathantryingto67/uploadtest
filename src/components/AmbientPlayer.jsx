import React, { useState } from 'react';

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
