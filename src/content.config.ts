import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SLOT_IDS, isSafeSvg } from './lib/slots';

// One Markdown file per costume piece in src/content/pieces/. The file name (without .md)
// is the piece's id; the Markdown body is the "how to make it" tip.
const pieces = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pieces' }),
  schema: z.object({
    name: z.string().min(1).max(30),
    slot: z.enum(SLOT_IDS),
    costume: z.string().min(1).max(24),
    author: z.string().min(1).max(40),
    svg: z
      .string()
      .min(1)
      .max(6000)
      .refine(isSafeSvg, 'svg may only contain drawing elements: no script, style, links, images or event handlers'),
  }),
});

export const collections = { pieces };
