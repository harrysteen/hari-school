// Copies the Class 1 students from src/data/students-demo.ts into Sanity, so the
// Studio starts with a full class to edit instead of an empty list.
//   npx tsx --conditions=react-server --env-file=.env.local scripts/import-class1-to-sanity.mts
// Needs SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local.
// Safe to re-run: each student keeps the same document id, but re-running
// OVERWRITES any edits made in the Studio for those students.
import { createClient } from '@sanity/client';
import { CLASS1_DEMO_STUDENTS, EXAMS, SUBJECTS } from '../src/data/students-demo';

const { SANITY_PROJECT_ID, SANITY_DATASET = 'production', SANITY_WRITE_TOKEN } = process.env;
if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) {
  console.error('Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env.local first.');
  process.exit(1);
}

const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2025-01-01',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

// Array items in Sanity need a unique _key
const keyed = <T extends object>(items: T[]) => items.map((item, i) => ({ _key: `k${i}`, ...item }));

const tx = client.transaction();
tx.createOrReplace({ _id: 'class-class-1', _type: 'schoolClass', classId: 'class-1', classTeacher: 'Mrs. Padmavathi' });

for (const s of CLASS1_DEMO_STUDENTS) {
  tx.createOrReplace({
    _id: `student-class-1-${s.id}`,
    _type: 'student',
    name: s.name,
    studentId: { _type: 'slug', current: s.id },
    classId: 'class-1',
    roll: s.roll,
    gender: s.gender,
    admissionNo: s.admissionNo,
    parentName: s.parentName,
    usesTransport: s.usesTransport,
    installments: keyed(s.fees.installments.map(({ name, dueDate, amount, paid }) => ({ _type: 'installment', name, dueDate, amount, paid }))),
    payments: keyed(s.fees.payments.map((p) => ({ _type: 'payment', ...p }))),
    marks: keyed(SUBJECTS.map((subject) => ({
      _type: 'subjectMarks',
      subject,
      ...Object.fromEntries(EXAMS.map((e, i) => [e.id.toLowerCase(), s.marks[subject][i]])),
    }))),
    attendance: keyed(s.attendance.map((a) => ({ _type: 'attendanceMonth', ...a }))),
    activities: keyed(s.activities.map((a) => ({ _type: 'activity', ...a }))),
    achievements: s.achievements, // plain strings don't need a _key
    remark: s.remark,
  });
}

await tx.commit();
console.log(`Imported ${CLASS1_DEMO_STUDENTS.length} Class 1 students into ${SANITY_PROJECT_ID}/${SANITY_DATASET}.`);
