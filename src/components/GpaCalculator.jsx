import React, { useState } from 'react';

export default function GpaCalculator() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Data Structures & Algorithms', credits: 4, grade: 'A' },
    { id: 2, name: 'Discrete Mathematics', credits: 3, grade: 'A-' },
    { id: 3, name: 'Web Application Development', credits: 3, grade: 'B+' },
    { id: 4, name: 'General Physics II', credits: 4, grade: 'A' },
  ]);

  const gradePoints = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0,
  };

  const totalCredits = courses.reduce((sum, c) => sum + Number(c.credits), 0);
  const totalPoints = courses.reduce((sum, c) => sum + (Number(c.credits) * (gradePoints[c.grade] || 0)), 0);
  const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Cumulative GPA Forecaster</h2>
          <p className="text-xs text-slate-400">Weighted grade point average computation</p>
        </div>
        <div className="bg-indigo-600/20 border border-indigo-500/30 px-4 py-2 rounded-lg text-right">
          <p className="text-xs text-indigo-300 font-semibold uppercase">Current GPA</p>
          <p className="text-2xl font-bold text-indigo-400 font-mono">{gpa}</p>
        </div>
      </div>

      <div className="space-y-3">
        {courses.map(course => (
          <div key={course.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800">
            <span className="text-sm font-medium text-slate-200">{course.name}</span>
            <div className="flex items-center space-x-3 text-xs">
              <span className="text-slate-400">{course.credits} Credits</span>
              <span className="bg-slate-800 text-indigo-400 font-bold px-2.5 py-1 rounded border border-slate-700">
                {course.grade} ({gradePoints[course.grade]})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
