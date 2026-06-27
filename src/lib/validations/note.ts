import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(100, "Title must be less than 100 characters."),

  content: z
    .string()
    .trim()
    .min(1, "Content is required."),

  subjectId: z
    .string()
    .min(1, "Please select a subject."),

  pinned: z.boolean().default(false),
});

export type NoteInput = z.infer<typeof noteSchema>;