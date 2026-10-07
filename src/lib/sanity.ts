import 'server-only';
import { createClient } from '@sanity/client';

// Student records live in a PRIVATE Sanity dataset, so every read needs a token.
// This file is server-only: the token must never reach the browser.
const projectId = process.env.SANITY_PROJECT_ID;

export const sanity = projectId
  ? createClient({
      projectId,
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: '2025-01-01',
      token: process.env.SANITY_READ_TOKEN,
      useCdn: false,
      perspective: 'published',
    })
  : null;
