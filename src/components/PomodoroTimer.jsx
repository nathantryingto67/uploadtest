import React, { useState, useEffect } from 'react';

export default function PomodoroTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [cycle, setCycle] = useState(1);

  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft(sec => sec - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
      setCycle(c => c + 1);
      setSecondsLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return String(mins).padStart(2, '0') + ':' + String(remainder).padStart(2, '0');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 max-w-md mx-auto text-center">
      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        Cycle #{cycle} &bull; Deep Work
      </span>
      <div className="text-6xl font-mono font-bold text-white tracking-tight my-6">
        {formatTime(secondsLeft)}
      </div>
      <div className="flex justify-center gap-3">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition"
        >
          {isActive ? 'Pause' : 'Start Focus Session'}
        </button>
        <button
          onClick={() => { setIsActive(false); setSecondsLeft(25 * 60); }}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium text-sm transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}