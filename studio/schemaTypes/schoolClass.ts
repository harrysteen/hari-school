import { defineField, defineType } from 'sanity';
import { CLASS_OPTIONS } from './options';

// One document per class: holds details shown on the class page
export const schoolClass = defineType({
  name: 'schoolClass',
  title: 'Class',
  type: 'document',
  fields: [
    defineField({
      name: 'classId',
      title: 'Class',
      type: 'string',
      options: { list: CLASS_OPTIONS },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'classTeacher', title: 'Class teacher', type: 'string' }),
  ],
  preview: { select: { title: 'classId', subtitle: 'classTeacher' } },
});
