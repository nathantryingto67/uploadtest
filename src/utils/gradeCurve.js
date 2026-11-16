// Grade curve calculator
export function calculateCurvedGrade(rawScore, mean, stdDev) {
  const zScore = (rawScore - mean) / stdDev;
  if (zScore >= 1.5) return 'A';
  if (zScore >= 0.5) return 'B';
  if (zScore >= -0.5) return 'C';
  if (zScore >= -1.5) return 'D';
  return 'F';
}
