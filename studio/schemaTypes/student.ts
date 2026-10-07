import { defineArrayMember, defineField, defineType } from 'sanity';
import { CLASS_OPTIONS, SUBJECTS } from './options';

const percent = (title: string) =>
  defineField({ name: title.toLowerCase(), title: `${title} %`, type: 'number', validation: (r) => r.min(0).max(100) });

// One document per student. Fee totals, fee status and attendance % are worked out
// by the website from these numbers, so they are never typed in by hand.
export const student = defineType({
  name: 'student',
  title: 'Student',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'fees', title: 'Fees' },
    { name: 'marks', title: 'Marks' },
    { name: 'attendance', title: 'Attendance' },
    { name: 'activities', title: 'Activities & remarks' },
  ],
  fields: [
    // Profile
    defineField({ name: 'name', title: 'Full name', type: 'string', group: 'profile', validation: (r) => r.required() }),
    defineField({
      name: 'studentId',
      title: 'Website ID',
      description: 'Used in the page address and the student login. Click Generate once — do not change it afterwards.',
      type: 'slug',
      group: 'profile',
      options: { source: 'name', maxLength: 60 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'classId',
      title: 'Class',
      type: 'string',
      group: 'profile',
      options: { list: CLASS_OPTIONS },
      initialValue: 'class-1',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'roll', title: 'Roll no.', type: 'string', group: 'profile', description: 'Two digits, e.g. 07' }),
    defineField({
      name: 'gender',
      type: 'string',
      group: 'profile',
      options: { list: ['Boy', 'Girl'], layout: 'radio', direction: 'horizontal' },
    }),
    defineField({ name: 'admissionNo', title: 'Admission no.', type: 'string', group: 'profile' }),
    defineField({ name: 'parentName', title: 'Parent', type: 'string', group: 'profile', description: 'e.g. S/o Srinivas Reddy' }),
    defineField({ name: 'usesTransport', title: 'Uses school bus', type: 'boolean', group: 'profile', initialValue: false }),

    // Fees
    defineField({
      name: 'installments',
      title: 'Fee instalments',
      type: 'array',
      group: 'fees',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'installment',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'dueDate', title: 'Due date', type: 'date', validation: (r) => r.required() }),
            defineField({ name: 'amount', title: 'Amount (₹)', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'paid', title: 'Paid so far (₹)', type: 'number', initialValue: 0, validation: (r) => r.min(0) }),
          ],
          preview: {
            select: { title: 'name', amount: 'amount', paid: 'paid', due: 'dueDate' },
            prepare: ({ title, amount = 0, paid = 0, due }) => ({ title, subtitle: `₹${paid} of ₹${amount} · due ${due ?? '—'}` }),
          },
        }),
      ],
    }),
    defineField({
      name: 'payments',
      title: 'Payment receipts',
      type: 'array',
      group: 'fees',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'payment',
          fields: [
            defineField({ name: 'date', type: 'date', validation: (r) => r.required() }),
            defineField({ name: 'receipt', title: 'Receipt no.', type: 'string' }),
            defineField({ name: 'amount', title: 'Amount (₹)', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'mode', type: 'string', options: { list: ['Cash', 'UPI', 'Online'] }, initialValue: 'Cash' }),
          ],
          preview: {
            select: { receipt: 'receipt', amount: 'amount', date: 'date', mode: 'mode' },
            prepare: ({ receipt, amount, date, mode }) => ({ title: `₹${amount} · ${mode ?? ''}`, subtitle: `${date ?? ''} · ${receipt ?? ''}` }),
          },
        }),
      ],
    }),

    // Marks
    defineField({
      name: 'marks',
      title: 'Marks',
      description: 'One row per subject. Leave an exam empty until it has been written.',
      type: 'array',
      group: 'marks',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subjectMarks',
          fields: [
            defineField({ name: 'subject', type: 'string', options: { list: SUBJECTS }, validation: (r) => r.required() }),
            percent('FA1'),
            percent('FA2'),
            percent('SA1'),
          ],
          preview: {
            select: { title: 'subject', fa1: 'fa1', fa2: 'fa2', sa1: 'sa1' },
            prepare: ({ title, fa1, fa2, sa1 }) => ({ title, subtitle: `FA1 ${fa1 ?? '–'} · FA2 ${fa2 ?? '–'} · SA1 ${sa1 ?? '–'}` }),
          },
        }),
      ],
      validation: (r) => r.unique(),
    }),

    // Attendance
    defineField({
      name: 'attendance',
      title: 'Attendance by month',
      type: 'array',
      group: 'attendance',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'attendanceMonth',
          fields: [
            defineField({ name: 'month', type: 'string', description: 'e.g. Jun', validation: (r) => r.required() }),
            defineField({ name: 'working', title: 'Working days', type: 'number', validation: (r) => r.required().min(0) }),
            defineField({ name: 'present', title: 'Days present', type: 'number', validation: (r) => r.required().min(0) }),
          ],
          preview: {
            select: { title: 'month', working: 'working', present: 'present' },
            prepare: ({ title, working, present }) => ({ title, subtitle: `${present ?? 0} / ${working ?? 0} days` }),
          },
        }),
      ],
    }),

    // Activities & remarks
    defineField({
      name: 'activities',
      type: 'array',
      group: 'activities',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'activity',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'schedule', type: 'string', description: 'e.g. Mon & Thu' }),
          ],
        }),
      ],
    }),
    defineField({ name: 'achievements', type: 'array', group: 'activities', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'remark', title: 'Teacher remark', type: 'text', rows: 3, group: 'activities' }),
  ],
  orderings: [{ title: 'Roll no.', name: 'rollAsc', by: [{ field: 'roll', direction: 'asc' }] }],
  preview: {
    select: { name: 'name', roll: 'roll', classId: 'classId' },
    prepare: ({ name, roll, classId }) => ({ title: name, subtitle: `${classId ?? ''} · Roll ${roll ?? '—'}` }),
  },
});
