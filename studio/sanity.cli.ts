import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  studioHost: 'hari-school',
  deployment: { appId: 'xq4tuu4d0vryp8otshxnjqg4' },
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  },
});
