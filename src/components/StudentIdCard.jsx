import React from 'react';

export default function StudentIdCard() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md mx-auto shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white tracking-wide">STATE UNIVERSITY</h3>
          <p className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">Digital Student Pass</p>
        </div>
        <div className="h-7 w-7 rounded bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-indigo-400 text-xs">
          SU
        </div>
      </div>

      <div className="mt-5 flex gap-4 items-center">
        <div className="h-20 w-20 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
          N
        </div>
        <div className="space-y-1">
          <h4 className="text-lg font-bold text-white">Nathan T.</h4>
          <p className="text-xs text-slate-400">B.S. Computer Science</p>
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Student
            </span>
            <span className="text-[10px] text-slate-500">ID: #2026-88492</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-[11px] text-slate-500">
        <span>Valid Thru: June 2028</span>
        <span className="font-mono tracking-widest text-slate-400">||| | |||| | |||||</span>
      </div>
    </div>
  );
}
