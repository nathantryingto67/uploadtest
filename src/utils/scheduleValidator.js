// Course collision detection and schedule validator
export function checkScheduleConflicts(courses) {
  const conflicts = [];
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      if (courses[i].schedule === courses[j].schedule) {
        conflicts.push({ courseA: courses[i].id, courseB: courses[j].id, slot: courses[i].schedule });
      }
    }
  }
  return conflicts;
}
