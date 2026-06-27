import { z } from "zod";

export const aiPromptSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(4000, "Message is too long."),
});

export type AIPromptInput = z.infer<typeof aiPromptSchema>;