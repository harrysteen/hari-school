import 'server-only';
import { CLASS1_DEMO_STUDENTS, type DemoStudent } from '@/data/students-demo';

// Per-class roster details. Server-only: contains student names.
type ClassRoster = {
  classTeacher: string;
  isDemo: boolean;
  students: DemoStudent[];
};

const ROSTERS: Record<string, ClassRoster> = {
  'class-1': { classTeacher: 'Mrs. Padmavathi (demo)', isDemo: true, students: CLASS1_DEMO_STUDENTS },
};

export const getRoster = (classId: string): ClassRoster | undefined => ROSTERS[classId];

export const findStudentInClass = (classId: string, studentId: string) =>
  ROSTERS[classId]?.students.find((s) => s.id === studentId);
