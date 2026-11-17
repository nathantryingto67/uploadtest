import { calculateCurvedGrade } from './gradeCurve.js';

console.log('Testing calculateCurvedGrade...');
console.assert(calculateCurvedGrade(85, 70, 10) === 'A', 'Expected A');
console.assert(calculateCurvedGrade(72, 70, 10) === 'B', 'Expected B');
console.log('Curve tests passed.');
