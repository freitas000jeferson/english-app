import { z } from 'zod';

export const exampleSchema = z.object({
	affirmativeEn: z.string().min(1),
	affirmativePt: z.string().min(1),
	negativeEn: z.string().min(1),
	negativePt: z.string().min(1),
	interrogativeEn: z.string().min(1),
	interrogativePt: z.string().min(1),
});

export const wordSchema = z.object({
	en: z.string().min(1),
	pt: z.string().min(1),
	description: z.string().optional(),
	imageUrl: z.string().optional(),
	categoryId: z.number().int(),
	examples: z.array(exampleSchema).min(1),
});

export type WordInput = z.infer<typeof wordSchema>;
