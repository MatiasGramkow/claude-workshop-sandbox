import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per attendee in src/content/attendees/.
// The file name (without .md) becomes the card's id, so keep it unique: your first name.
const attendees = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/attendees' }),
  schema: z.object({
    name: z.string().min(1).max(40),
    emoji: z.string().min(1).max(8),
    team: z.string().min(1).max(40),
    goal: z.string().min(1).max(140),
  }),
});

export const collections = { attendees };
