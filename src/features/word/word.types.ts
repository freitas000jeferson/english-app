import type { Category, Example, Word } from '@prisma/client';

export type WordWithRelations = Word & {
	category: Category;
	examples: Example[];
};
