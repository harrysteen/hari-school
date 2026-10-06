import 'server-only';

// DEMO DATA ONLY — fictional Class 1 students used to preview the student dashboard.
// Values come from a seeded generator so every student differs but stays stable
// between page loads. Replace with real records (behind a parent login) later.

export const DEMO_TODAY = '2026-10-07';

export const SUBJECTS = ['Telugu', 'English', 'Hindi', 'Mathematics', 'EVS', 'Computers'] as const;
export type Subject = (typeof SUBJECTS)[number];

export const EXAMS = [
  { id: 'FA1', name: 'Formative Assessment 1', month: 'Jul 2026' },
  { id: 'FA2', name: 'Formative Assessment 2', month: 'Aug 2026' },
  { id: 'SA1', name: 'Summative Assessment 1', month: 'Sep 2026' },
] as const;
export const NEXT_EXAM = 'FA3 · November 2026';

export type InstallmentStatus = 'paid' | 'partial' | 'overdue' | 'due-soon' | 'upcoming';

export type FeeInstallment = {
  name: string;
  dueDate: string;   // ISO date
  amount: number;
  paid: number;
  status: InstallmentStatus;
};

export type FeePayment = {
  date: string;
  receipt: string;
  amount: number;
  mode: 'Cash' | 'UPI' | 'Online';
};

export type AttendanceMonth = { month: string; working: number; present: number };

export type Activity = { name: string; schedule: string };

export type DemoStudent = {
  id: string;
  roll: string;
  name: string;
  gender: 'Boy' | 'Girl';
  admissionNo: string;
  parentName: string;
  usesTransport: boolean;
  fees: { installments: FeeInstallment[]; payments: FeePayment[]; total: number; paid: number; pending: number; overdue: number };
  marks: Record<Subject, number[]>;   // one % per exam, in EXAMS order
  attendance: AttendanceMonth[];
  activities: Activity[];
  achievements: string[];
  remark: string;
};

// Small deterministic PRNG (mulberry32) so demo values never change between renders
function rng(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NAMES: [string, 'Boy' | 'Girl', string][] = [
  ['Aarav Reddy', 'Boy', 'Srinivas Reddy'],
  ['Ananya Varma', 'Girl', 'Ravi Varma'],
  ['Bhavya Sri', 'Girl', 'Satyanarayana'],
  ['Charan Teja', 'Boy', 'Venkatesh'],
  ['Deekshitha', 'Girl', 'Prasad Rao'],
  ['Harsha Vardhan', 'Boy', 'Nageswara Rao'],
  ['Hasini', 'Girl', 'Ramesh Babu'],
  ['Jashwanth', 'Boy', 'Suresh Kumar'],
  ['Keerthana', 'Girl', 'Krishna Murthy'],
  ['Lohith', 'Boy', 'Anil Kumar'],
  ['Manasvi', 'Girl', 'Rajesh'],
  ['Nikhil Sai', 'Boy', 'Srinu Babu'],
  ['Pranavi', 'Girl', 'Mahesh'],
  ['Rithvik', 'Boy', 'Chandra Sekhar'],
  ['Sahasra', 'Girl', 'Ramakrishna'],
  ['Sai Charan', 'Boy', 'Durga Prasad'],
  ['Tanvi', 'Girl', 'Kiran Kumar'],
  ['Varshith', 'Boy', 'Naresh'],
  ['Yashaswini', 'Girl', 'Sridhar'],
  ['Vihaan', 'Boy', 'Phani Kumar'],
];

const ACTIVITIES: Activity[] = [
  { name: 'Drawing & Colouring', schedule: 'Mon & Thu' },
  { name: 'Classical Dance', schedule: 'Tue & Fri' },
  { name: 'Yoga', schedule: 'Daily · Assembly' },
  { name: 'Abacus', schedule: 'Wed' },
  { name: 'Chess', schedule: 'Sat' },
  { name: 'Athletics', schedule: 'Tue & Thu' },
  { name: 'Music (Vocal)', schedule: 'Fri' },
  { name: 'Karate', schedule: 'Sat' },
];

const ACHIEVEMENTS = [
  '1st Prize · Drawing Competition, Freshers Party 2026',
  'Best Performer · Group Dance, Freshers Party 2026',
  'Gold · 50 m Race, School Sports Meet',
  'Star of the Month · July 2026',
  'Runner-up · English Spelling Bee',
  'Certificate · Abacus Level 1 completed',
];

const ATTENDANCE_DAYS: [string, number][] = [['Jun', 16], ['Jul', 25], ['Aug', 24], ['Sep', 24], ['Oct', 4]];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function buildFees(r: () => number, usesTransport: boolean, roll: number) {
  const plan = [
    { name: 'Term 1 Tuition', dueDate: '2026-06-15', amount: 8000 },
    { name: 'Books & Uniform', dueDate: '2026-06-15', amount: 6500 },
    ...(usesTransport ? [{ name: 'Transport · Term 1', dueDate: '2026-06-15', amount: 3000 }] : []),
    { name: 'Term 2 Tuition', dueDate: '2026-10-15', amount: 8000 },
    ...(usesTransport ? [{ name: 'Transport · Term 2', dueDate: '2026-10-15', amount: 3000 }] : []),
    { name: 'Term 3 Tuition', dueDate: '2027-01-15', amount: 8000 },
    ...(usesTransport ? [{ name: 'Transport · Term 3', dueDate: '2027-01-15', amount: 3000 }] : []),
  ];

  // Payment profile: 0 = paid ahead, 1 = term 1 cleared, 2 = term 1 part-paid, 3 = only books paid
  const profile = Math.floor(r() * 4);
  const payments: FeePayment[] = [];
  const modes: FeePayment['mode'][] = ['Cash', 'UPI', 'Online'];
  let receipt = 1040 + roll * 7;

  const installments: FeeInstallment[] = plan.map((p) => {
    const term1 = p.dueDate === '2026-06-15';
    const term2 = p.dueDate === '2026-10-15';
    let paid = 0;
    if (profile === 0 && (term1 || term2)) paid = p.amount;
    if (profile === 1 && term1) paid = p.amount;
    if (profile === 2 && term1) paid = p.name.startsWith('Term 1') ? 5000 : p.amount;
    if (profile === 3 && p.name === 'Books & Uniform') paid = p.amount;

    const isPast = p.dueDate < DEMO_TODAY;
    const status: InstallmentStatus =
      paid >= p.amount ? 'paid'
        : isPast ? (paid > 0 ? 'partial' : 'overdue')
        : p.dueDate <= '2026-10-31' ? 'due-soon'
        : 'upcoming';
    return { ...p, paid, status };
  });

  // Group what was paid into receipts per due date
  const byDate = new Map<string, number>();
  installments.forEach((i) => { if (i.paid) byDate.set(i.dueDate, (byDate.get(i.dueDate) ?? 0) + i.paid); });
  const payDates: Record<string, string> = { '2026-06-15': `2026-06-${String(5 + Math.floor(r() * 10)).padStart(2, '0')}`, '2026-10-15': `2026-09-${String(20 + Math.floor(r() * 9)).padStart(2, '0')}` };
  byDate.forEach((amount, due) => payments.push({ date: payDates[due], receipt: `HES/26/${receipt++}`, amount, mode: modes[Math.floor(r() * 3)] }));

  const total = installments.reduce((s, i) => s + i.amount, 0);
  const paid = installments.reduce((s, i) => s + i.paid, 0);
  const overdue = installments.filter((i) => i.dueDate < DEMO_TODAY).reduce((s, i) => s + (i.amount - i.paid), 0);
  return { installments, payments, total, paid, pending: total - paid, overdue };
}

function buildStudent(entry: (typeof NAMES)[number], index: number): DemoStudent {
  const [name, gender, father] = entry;
  const r = rng(2026 * 100 + index + 1);
  const roll = index + 1;
  const usesTransport = r() < 0.55;

  // Ability sets the overall level; each subject wobbles around it and drifts a little per exam
  const ability = 58 + r() * 36;
  const marks = Object.fromEntries(
    SUBJECTS.map((subject) => {
      const offset = (r() - 0.5) * 18;
      const trend = (r() - 0.4) * 6;
      return [subject, EXAMS.map((_, e) => Math.round(Math.min(99, Math.max(38, ability + offset + trend * e + (r() - 0.5) * 8))))];
    })
  ) as Record<Subject, number[]>;

  const absentRate = 0.02 + r() * 0.1;
  const attendance = ATTENDANCE_DAYS.map(([month, working]) => ({
    month,
    working,
    present: working - Math.min(working, Math.round(working * absentRate * (0.5 + r()))),
  }));

  const activityCount = 2 + Math.floor(r() * 2);
  const start = Math.floor(r() * ACTIVITIES.length);
  const activities = Array.from({ length: activityCount }, (_, k) => ACTIVITIES[(start + k * 3) % ACTIVITIES.length]);
  const achievements = ACHIEVEMENTS.filter(() => r() < 0.22).slice(0, 2);

  const avg = SUBJECTS.reduce((s, sub) => s + marks[sub][EXAMS.length - 1], 0) / SUBJECTS.length;
  const remark =
    avg >= 85 ? `${name.split(' ')[0]} is an outstanding learner — curious, confident and always ready to help classmates.`
      : avg >= 70 ? `${name.split(' ')[0]} is doing well and participates actively. More reading practice at home will help.`
      : `${name.split(' ')[0]} is improving steadily. Daily revision of basics and reading aloud at home is recommended.`;

  return {
    id: slug(name),
    roll: String(roll).padStart(2, '0'),
    name,
    gender,
    admissionNo: `HES-2026-${String(100 + roll * 3)}`,
    parentName: `${gender === 'Boy' ? 'S/o' : 'D/o'} ${father}`,
    usesTransport,
    fees: buildFees(r, usesTransport, roll),
    marks,
    attendance,
    activities,
    achievements,
    remark,
  };
}

export const CLASS1_DEMO_STUDENTS: DemoStudent[] = NAMES.map(buildStudent);

export const findDemoStudent = (id: string) => CLASS1_DEMO_STUDENTS.find((s) => s.id === id);

export const gradeFor = (pct: number) =>
  pct >= 91 ? 'A1' : pct >= 81 ? 'A2' : pct >= 71 ? 'B1' : pct >= 61 ? 'B2' : pct >= 51 ? 'C1' : pct >= 41 ? 'C2' : 'D';
