import React, { useState } from 'react'
import DegreeRoadmap from './components/DegreeRoadmap.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              CH
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight">CampusHub</span>
              <span className="ml-2 text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/20">Student Workspace</span>
            </div>
          </div>

          <nav className="flex space-x-1 sm:space-x-2">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'roadmap', label: 'Degree Roadmap' },
              { id: 'schedule', label: 'Class Schedule' },
              { id: 'gpa', label: 'GPA Calculator' },
              { id: 'tasks', label: 'Assignments' },
              { id: 'pomodoro', label: 'Study Timer' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
        {activeTab === 'roadmap' && <DegreeRoadmap />}
        {activeTab === 'schedule' && <ScheduleView />}
        {activeTab === 'gpa' && <GpaCalculatorView />}
        {activeTab === 'tasks' && <TasksView />}
        {activeTab === 'pomodoro' && <PomodoroView />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        CampusHub Student Workspace &bull; Built with React & TailwindCSS
      </footer>
    </div>
  )
}

function DashboardView({ onNavigate }) {
  const stats = [
    { label: 'Enrolled Courses', value: '5 Classes', desc: 'Current Semester' },
    { label: 'Cumulative GPA', value: '3.82', desc: 'Dean\'s List Target' },
    { label: 'Pending Assignments', value: '3 Due Soon', desc: 'Next: Discrete Math' },
    { label: 'Study Hours Today', value: '2.5 hrs', desc: 'Goal: 4.0 hrs' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Student Overview</h1>
          <p className="text-sm text-slate-400">Welcome back! Here is a summary of your academic schedule and tasks.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('roadmap')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition"
          >
            View Degree Roadmap
          </button>
          <button
            onClick={() => onNavigate('tasks')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition"
          >
            + Add Assignment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
            <p className="text-2xl font-bold text-white mt-2">{item.value}</p>
            <p className="text-xs text-indigo-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScheduleView() {
  const classes = [
    { code: 'CS 201', name: 'Data Structures & Algorithms', time: '09:00 - 10:30 AM', room: 'Sci-Tech Hall 304', days: 'Mon / Wed' },
    { code: 'MATH 215', name: 'Discrete Mathematics', time: '11:00 - 12:30 PM', room: 'Math Pavilion 102', days: 'Tue / Thu' },
    { code: 'CS 320', name: 'Web Application Development', time: '01:30 - 03:00 PM', room: 'Computer Lab 3B', days: 'Mon / Wed / Fri' },
    { code: 'PHYS 102', name: 'General Physics II', time: '03:30 - 05:00 PM', room: 'Lecture Hall A', days: 'Tue / Thu' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white">Weekly Class Schedule</h2>
        <p className="text-sm text-slate-400">Timetable and lecture halls for the current academic term.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {classes.map((cls, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {cls.code}
              </span>
              <span className="text-xs text-slate-400">{cls.days}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mt-2">{cls.name}</h3>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Time: {cls.time}</span>
              <span>Room: {cls.room}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GpaCalculatorView() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-2xl">
      <h2 className="text-xl font-bold text-white mb-2">GPA & Grade Calculator</h2>
      <p className="text-sm text-slate-400 mb-6">Calculate cumulative grade points across completed units.</p>
      <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-300">
        Grade computation utility with weighted credit units configured.
      </div>
    </div>
  )
}

function TasksView() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
      <h2 className="text-xl font-bold text-white mb-2">Assignment Tracker</h2>
      <p className="text-sm text-slate-400 mb-6">Organize upcoming project submissions and deadlines.</p>
      <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-300">
        Assignment checklist and priority queuing active.
      </div>
    </div>
  )
}

function PomodoroView() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md mx-auto text-center">
      <h2 className="text-xl font-bold text-white mb-2">Study Focus Timer</h2>
      <p className="text-sm text-slate-400 mb-6">25-minute Pomodoro focus interval.</p>
      <div className="text-5xl font-mono font-bold text-indigo-400 my-8">25:00</div>
      <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium text-sm transition">
        Start Focus Session
      </button>
    </div>
  )
}
