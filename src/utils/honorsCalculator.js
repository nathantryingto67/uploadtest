// Academic honors tier classifier
export function getHonorsStanding(cumulativeGpa) {
  if (cumulativeGpa >= 3.85) return 'Summa Cum Laude';
  if (cumulativeGpa >= 3.70) return 'Magna Cum Laude';
  if (cumulativeGpa >= 3.50) return 'Cum Laude';
  if (cumulativeGpa >= 3.20) return "Dean's List";
  return 'Good Academic Standing';
}
