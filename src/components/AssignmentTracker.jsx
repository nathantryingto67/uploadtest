import React, { useState } from 'react';

export default function AssignmentTracker() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Algorithm Analysis Problem Set 4', course: 'CS 201', due: '2026-11-15', priority: 'High', completed: false },
    { id: 2, title: 'Physics Lab Report: Optics', course: 'PHYS 102', due: '2026-11-18', priority: 'Medium', completed: false },
    { id: 3, title: 'React State Management Essay', course: 'CS 320', due: '2026-11-22', priority: 'Low', completed: true },
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const priorityColors = {
    High: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
    Medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-2">Assignment Submission Tracker</h2>
      <p className="text-xs text-slate-400 mb-6">Upcoming homework, quizzes, and project milestones</p>

      <div className="space-y-3">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className="flex items-center justify-between p-4 bg-slate-950 rounded-lg border border-slate-800 hover:border-slate-700 cursor-pointer transition"
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {}}
                className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-0"
              />
              <div>
                <p className={"text-sm font-medium " + (task.completed ? 'line-through text-slate-500' : 'text-slate-200')}>
                  {task.title}
                </p>
                <p className="text-xs text-slate-400">{task.course} &bull; Due {task.due}</p>
              </div>
            </div>
            <span className={"text-xs px-2.5 py-1 rounded border font-medium " + priorityColors[task.priority]}>
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
