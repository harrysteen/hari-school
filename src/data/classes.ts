// Classes offered, grouped by section. Drives the "Student Corner" navbar
// dropdown, the /students overview and each /students/[classId] page.
// Fill in classTeacher and students as the data becomes available.

// NOTE: this file is imported by the public home page (navbar), so it must never
// contain student records. Rosters and dashboards live in server-only modules.

export type SchoolClass = {
  id: string;          // used in the URL: /students/<id>
  label: string;       // e.g. "Class 5"
  navLabel: string;    // shorter text for the dropdown, e.g. "5th Class"
};

export type ClassGroup = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  classes: SchoolClass[];
};

const cls = (n: number, navLabel: string): SchoolClass => ({ id: `class-${n}`, label: `Class ${n}`, navLabel });

export const CLASS_GROUPS: ClassGroup[] = [
  {
    id: 'pre-primary',
    name: 'Pre-Primary',
    tagline: 'Joyful foundational learning',
    emoji: '🧸',
    classes: [{ id: 'ukg', label: 'UKG', navLabel: 'UKG' }],
  },
  {
    id: 'primary',
    name: 'Primary School',
    tagline: 'Class 1 to 5 · Core mastery',
    emoji: '📚',
    classes: [
      cls(1, '1st Class'),
      cls(2, '2nd Class'),
      cls(3, '3rd Class'),
      cls(4, '4th Class'),
      cls(5, '5th Class'),
    ],
  },
  {
    id: 'middle',
    name: 'Middle School',
    tagline: 'Class 6 to 8 · Analytical skills',
    emoji: '🔬',
    classes: [cls(6, '6th Class'), cls(7, '7th Class'), cls(8, '8th Class')],
  },
  {
    id: 'high',
    name: 'High School',
    tagline: 'Class 9 & 10 · Board preparation',
    emoji: '📖',
    classes: [cls(9, '9th Class'), cls(10, '10th Class')],
  },
  {
    id: 'intermediate',
    name: 'Intermediate College',
    tagline: 'Inter 1st & 2nd Year · Junior college',
    emoji: '🎓',
    classes: [
      { id: 'class-11', label: 'Class 11 (1st Year Inter)', navLabel: '11th Class' },
      { id: 'class-12', label: 'Class 12 (2nd Year Inter)', navLabel: '12th Class' },
    ],
  },
];

export const ALL_CLASSES = CLASS_GROUPS.flatMap((group) =>
  group.classes.map((schoolClass) => ({ ...schoolClass, group }))
);

export const findClass = (id: string) => ALL_CLASSES.find((c) => c.id === id);
