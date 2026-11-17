import { useMemo } from 'react';

export function useCourseFilter(courses, query, category) {
  return useMemo(() => {
    return courses.filter(c => {
      const matchQuery = !query || c.name.toLowerCase().includes(query.toLowerCase()) || c.code.toLowerCase().includes(query.toLowerCase());
      const matchCat = category === 'all' || c.category === category;
      return matchQuery && matchCat;
    });
  }, [courses, query, category]);
}
