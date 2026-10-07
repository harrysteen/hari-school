import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'HARI E-TECHNO SCHOOL',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('School')
          .items([
            S.listItem()
              .title('Class 1 students')
              .child(
                S.documentList()
                  .title('Class 1 students')
                  .schemaType('student')
                  .filter('_type == "student" && classId == "class-1"')
                  .defaultOrdering([{ field: 'roll', direction: 'asc' }])
                  .initialValueTemplates([S.initialValueTemplateItem('student')])
              ),
            S.documentTypeListItem('student').title('All students'),
            S.documentTypeListItem('schoolClass').title('Classes & teachers'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
