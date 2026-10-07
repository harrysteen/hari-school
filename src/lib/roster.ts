import 'server-only';
import { cache } from 'react';
import { CLASS1_DEMO_STUDENTS, EXAMS, SUBJECTS, type DemoStudent, type FeeInstallment, type FeePayment, type InstallmentStatus, type Subject } from '@/data/students-demo';
import { sanity } from '@/lib/sanity';

// Per-class roster details. Server-only: contains student names.
// When SANITY_PROJECT_ID is set, rosters come from Sanity; otherwise the demo data is used.
type ClassRoster = {
  classTeacher: string;
  isDemo: boolean;
  students: DemoStudent[];
};

const DEMO_ROSTERS: Record<string, ClassRoster> = {
  'class-1': { classTeacher: 'Mrs. Padmavathi (demo)', isDemo: true, students: CLASS1_DEMO_STUDENTS },
};

type SanityStudent = {
  name: string;
  studentId: string;
  roll?: string;
  gender?: 'Boy' | 'Girl';
  admissionNo?: string;
  parentName?: string;
  usesTransport?: boolean;
  installments?: { name: string; dueDate: string; amount?: number; paid?: number }[];
  payments?: FeePayment[];
  marks?: ({ subject: Subject } & Record<'fa1' | 'fa2' | 'sa1', number | undefined>)[];
  attendance?: DemoStudent['attendance'];
  activities?: DemoStudent['activities'];
  achievements?: string[];
  remark?: string;
};

const ROSTER_QUERY = `{
  "classTeacher": *[_type == "schoolClass" && classId == $classId][0].classTeacher,
  "students": *[_type == "student" && classId == $classId && defined(studentId.current)] | order(roll asc, name asc) {
    name, "studentId": studentId.current, roll, gender, admissionNo, parentName, usesTransport,
    installments[]{ name, dueDate, amount, paid },
    payments[]{ date, receipt, amount, mode },
    marks[]{ subject, fa1, fa2, sa1 },
    attendance[]{ month, working, present },
    activities[]{ name, schedule },
    achievements, remark
  }
}`;

// Today's date in India, as YYYY-MM-DD, for working out which fees are overdue
const todayIST = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
const addDays = (iso: string, days: number) => new Date(Date.parse(`${iso}T00:00:00Z`) + days * 864e5).toISOString().slice(0, 10);

function toStudent(doc: SanityStudent, today: string): DemoStudent {
  const dueSoonBy = addDays(today, 30);
  const installments: FeeInstallment[] = (doc.installments ?? []).map((i) => {
    const amount = i.amount ?? 0;
    const paid = i.paid ?? 0;
    const status: InstallmentStatus =
      paid >= amount ? 'paid'
        : i.dueDate < today ? (paid > 0 ? 'partial' : 'overdue')
        : i.dueDate <= dueSoonBy ? 'due-soon'
        : 'upcoming';
    return { name: i.name, dueDate: i.dueDate, amount, paid, status };
  });
  const total = installments.reduce((s, i) => s + i.amount, 0);
  const paid = installments.reduce((s, i) => s + i.paid, 0);
  const overdue = installments.filter((i) => i.dueDate < today).reduce((s, i) => s + (i.amount - i.paid), 0);

  // Exams not yet written count as 0 until the teacher enters them
  const examKeys = EXAMS.map((e) => e.id.toLowerCase() as 'fa1' | 'fa2' | 'sa1');
  const marks = Object.fromEntries(
    SUBJECTS.map((subject) => {
      const row = doc.marks?.find((m) => m.subject === subject);
      return [subject, examKeys.map((k) => row?.[k] ?? 0)];
    })
  ) as Record<Subject, number[]>;

  return {
    id: doc.studentId,
    roll: doc.roll ?? '',
    name: doc.name,
    gender: doc.gender ?? 'Boy',
    admissionNo: doc.admissionNo ?? '',
    parentName: doc.parentName ?? '',
    usesTransport: doc.usesTransport ?? false,
    fees: { installments, payments: doc.payments ?? [], total, paid, pending: total - paid, overdue },
    marks,
    attendance: doc.attendance ?? [],
    activities: doc.activities ?? [],
    achievements: doc.achievements ?? [],
    remark: doc.remark ?? '',
  };
}

// cache(): one Sanity request per class per page render, however many times it is called
export const getRoster = cache(async (classId: string): Promise<ClassRoster | undefined> => {
  if (!sanity) return DEMO_ROSTERS[classId];
  const data = await sanity.fetch<{ classTeacher: string | null; students: SanityStudent[] }>(ROSTER_QUERY, { classId });
  if (!data.students.length && !data.classTeacher) return undefined;
  const today = todayIST();
  return {
    classTeacher: data.classTeacher ?? 'To be updated',
    isDemo: false,
    students: data.students.map((s) => toStudent(s, today)),
  };
});

export const findStudentInClass = async (classId: string, studentId: string) =>
  (await getRoster(classId))?.students.find((s) => s.id === studentId);
