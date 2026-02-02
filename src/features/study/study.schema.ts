import { z } from 'zod';

export const answerSchema = z.object({
	wordId: z.number().int().positive(),
	grade: z.number().min(0).max(3),
});

export type AnswerInput = z.infer<typeof answerSchema>;
