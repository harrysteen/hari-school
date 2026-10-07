// Keep these in sync with src/data/classes.ts and src/data/students-demo.ts on the website
export const CLASS_OPTIONS = [
  { title: 'UKG', value: 'ukg' },
  ...[1, 2, 3, 4, 5, 6, 7, 8, 11, 12].map((n) => ({ title: `Class ${n}`, value: `class-${n}` })),
];

export const SUBJECTS = ['Telugu', 'English', 'Hindi', 'Mathematics', 'EVS', 'Computers'];
