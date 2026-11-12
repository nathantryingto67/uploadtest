import React, { useState } from 'react';

const initialCourses = [
  // Year 1 - Foundations
  { id: 'CS101', code: 'CS 101', name: 'Introduction to Computer Science', credits: 4, category: 'core', year: 1, term: 'Fall', status: 'completed', grade: 'A', prereq: [] },
  { id: 'MATH101', code: 'MATH 101', name: 'Calculus I', credits: 4, category: 'math', year: 1, term: 'Fall', status: 'completed', grade: 'A-', prereq: [] },
  { id: 'ENG101', code: 'ENG 101', name: 'Academic Writing & Rhetoric', credits: 3, category: 'gened', year: 1, term: 'Fall', status: 'completed', grade: 'A', prereq: [] },
  { id: 'CS102', code: 'CS 102', name: 'Object-Oriented Programming (Java)', credits: 4, category: 'core', year: 1, term: 'Spring', status: 'completed', grade: 'A', prereq: ['CS101'] },
  { id: 'MATH102', code: 'MATH 102', name: 'Calculus II', credits: 4, category: 'math', year: 1, term: 'Spring', status: 'completed', grade: 'B+', prereq: ['MATH101'] },
  { id: 'PHYS101', code: 'PHYS 101', name: 'General Physics I: Mechanics', credits: 4, category: 'science', year: 1, term: 'Spring', status: 'completed', grade: 'A-', prereq: ['MATH101'] },

  // Year 2 - Core Systems & Theory
  { id: 'CS201', code: 'CS 201', name: 'Data Structures & Algorithms', credits: 4, category: 'core', year: 2, term: 'Fall', status: 'in-progress', grade: null, prereq: ['CS102'] },
  { id: 'MATH215', code: 'MATH 215', name: 'Discrete Mathematics', credits: 3, category: 'math', year: 2, term: 'Fall', status: 'in-progress', grade: null, prereq: ['MATH101'] },
  { id: 'CS220', code: 'CS 220', name: 'Computer Architecture & Assembly', credits: 4, category: 'core', year: 2, term: 'Fall', status: 'in-progress', grade: null, prereq: ['CS102'] },
  { id: 'PHYS102', code: 'PHYS 102', name: 'General Physics II: Electromagnetism', credits: 4, category: 'science', year: 2, term: 'Fall', status: 'in-progress', grade: null, prereq: ['PHYS101'] },
  { id: 'CS250', code: 'CS 250', name: 'Operating Systems & Systems Programming', credits: 4, category: 'core', year: 2, term: 'Spring', status: 'planned', grade: null, prereq: ['CS201', 'CS220'] },
  { id: 'CS270', code: 'CS 270', name: 'Database Systems & SQL Design', credits: 3, category: 'core', year: 2, term: 'Spring', status: 'planned', grade: null, prereq: ['CS201'] },
  { id: 'MATH240', code: 'MATH 240', name: 'Linear Algebra & Differential Equations', credits: 3, category: 'math', year: 2, term: 'Spring', status: 'planned', grade: null, prereq: ['MATH102'] },

  // Year 3 - Advanced & Electives
  { id: 'CS320', code: 'CS 320', name: 'Web Application Development', credits: 3, category: 'elective', year: 3, term: 'Fall', status: 'planned', grade: null, prereq: ['CS201'] },
  { id: 'CS340', code: 'CS 340', name: 'Computer Networks & Distributed Systems', credits: 4, category: 'core', year: 3, term: 'Fall', status: 'planned', grade: null, prereq: ['CS250'] },
  { id: 'CS360', code: 'CS 360', name: 'Software Engineering Principles', credits: 3, category: 'core', year: 3, term: 'Spring', status: 'planned', grade: null, prereq: ['CS201'] },
  { id: 'CS380', code: 'CS 380', name: 'Machine Learning & Predictive Modeling', credits: 4, category: 'elective', year: 3, term: 'Spring', status: 'planned', grade: null, prereq: ['CS201', 'MATH240'] },

  // Year 4 - Capstone & Specialization
  { id: 'CS490', code: 'CS 490', name: 'Senior Capstone Design Project I', credits: 3, category: 'core', year: 4, term: 'Fall', status: 'planned', grade: null, prereq: ['CS360'] },
  { id: 'CS450', code: 'CS 450', name: 'Cloud Computing & DevOps Architecture', credits: 3, category: 'elective', year: 4, term: 'Fall', status: 'planned', grade: null, prereq: ['CS340'] },
  { id: 'CS491', code: 'CS 491', name: 'Senior Capstone Design Project II', credits: 3, category: 'core', year: 4, term: 'Spring', status: 'planned', grade: null, prereq: ['CS490'] },
];

export default function DegreeRoadmap() {
  const [courses, setCourses] = useState(initialCourses);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const totalCreditsNeeded = 120;
  const completedCredits = courses.filter(c => c.status === 'completed').reduce((sum, c) => sum + c.credits, 0);
  const inProgressCredits = courses.filter(c => c.status === 'in-progress').reduce((sum, c) => sum + c.credits, 0);
  const percentComplete = Math.round((completedCredits / totalCreditsNeeded) * 100);

  const toggleCourseStatus = (id) => {
    setCourses(prev => prev.map(c => {
      if (c.id !== id) return c;
      const nextStatus = c.status === 'completed' ? 'in-progress' : (c.status === 'in-progress' ? 'planned' : 'completed');
      return { ...c, status: nextStatus };
    }));
  };

  const filteredCourses = courses.filter(c => {
    if (filterCategory !== 'all' && c.category !== filterCategory) return false;
    if (filterStatus !== 'all' && c.status !== filterStatus) return false;
    return true;
  });

  const categoryBadges = {
    core: { label: 'CS Core', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    math: { label: 'Math', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    science: { label: 'Science', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    elective: { label: 'Elective', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    gened: { label: 'General Ed', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  };

  const statusBadges = {
    completed: { label: 'Completed', color: 'bg-emerald-600/20 text-emerald-300 border-emerald-600/30' },
    'in-progress': { label: 'In Progress', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    planned: { label: 'Planned', color: 'bg-slate-800 text-slate-400 border-slate-700' },
  };

  return (
    <div className="space-y-8">
      {/* Header & Metrics */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">Degree Audit & Curriculum Planner</span>
          <h1 className="text-2xl font-bold text-white mt-1">B.S. Computer Science Roadmap</h1>
          <p className="text-sm text-slate-400 mt-1">Track course prerequisites, credit milestones, and graduation requirements.</p>
        </div>

        {/* Graduation Progress Bar */}
        <div className="w-full md:w-80 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-300 font-medium">Degree Completion</span>
            <span className="text-indigo-400 font-bold font-mono">{percentComplete}% ({completedCredits}/{totalCreditsNeeded} cr)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 pt-1">
            <span>In Progress: {inProgressCredits} cr</span>
            <span>Target: Spring 2028</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'core', label: 'CS Core' },
            { id: 'math', label: 'Mathematics' },
            { id: 'science', label: 'Natural Science' },
            { id: 'elective', label: 'Electives' },
            { id: 'gened', label: 'Gen Ed' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filterCategory === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="planned">Planned</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            onClick={() => setSelectedCourse(course)}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] px-2 py-0.5 rounded font-bold border ${categoryBadges[course.category]?.color}`}>
                  {course.code}
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded border font-medium ${statusBadges[course.status]?.color}`}>
                  {statusBadges[course.status]?.label}
                </span>
              </div>

              <h3 className="text-base font-semibold text-white mt-3 group-hover:text-indigo-300 transition">
                {course.name}
              </h3>

              <div className="flex items-center space-x-2 mt-2 text-xs text-slate-400">
                <span>{course.credits} Credits</span>
                <span>&bull;</span>
                <span>Year {course.year} ({course.term})</span>
                {course.grade && (
                  <>
                    <span>&bull;</span>
                    <span className="text-emerald-400 font-semibold font-mono">Grade: {course.grade}</span>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                {course.prereq.length > 0 ? `Prereq: ${course.prereq.join(', ')}` : 'No Prerequisites'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCourseStatus(course.id);
                }}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition"
              >
                Change Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className={`text-xs px-2 py-0.5 rounded font-bold border ${categoryBadges[selectedCourse.category]?.color}`}>
                  {selectedCourse.code}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{selectedCourse.name}</h2>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-white text-lg font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500">Credits</span>
                <p className="text-white font-semibold text-sm mt-0.5">{selectedCourse.credits} Credit Hours</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500">Current Status</span>
                <p className="text-white font-semibold text-sm mt-0.5 capitalize">{selectedCourse.status.replace('-', ' ')}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500">Recommended Semester</span>
                <p className="text-white font-semibold text-sm mt-0.5">Year {selectedCourse.year} - {selectedCourse.term}</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500">Earned Grade</span>
                <p className="text-white font-semibold text-sm mt-0.5 font-mono">{selectedCourse.grade || 'Pending / N/A'}</p>
              </div>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Prerequisites</h4>
              <p className="text-xs text-slate-400">
                {selectedCourse.prereq.length > 0
                  ? `Must complete before enrolling: ${selectedCourse.prereq.join(', ')}`
                  : 'Open enrollment. No introductory prerequisites required.'}
              </p>
            </div>

            <div className="pt-4 flex justify-end space-x-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
