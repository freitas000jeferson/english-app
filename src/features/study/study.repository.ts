import { prisma } from '@/lib/prisma';

export const StudyRepository = {
	findReview(wordId: number) {
		return prisma.review.findUnique({
			where: { wordId },
		});
	},

	createReview(data: {
		wordId: number;
		interval: number;
		easeFactor: number;
		repetitions: number;
		nextReviewAt: Date;
		lastGrade: number;
	}) {
		return prisma.review.create({ data });
	},

	updateReview(
		wordId: number,
		data: Partial<{
			interval: number;
			easeFactor: number;
			repetitions: number;
			nextReviewAt: Date;
			lastGrade: number;
		}>,
	) {
		return prisma.review.update({
			where: { wordId },
			data,
		});
	},

	getStudyQueue(categoryId?: number, limit = 10) {
		const now = new Date();

		return prisma.word.findMany({
			where: {
				OR: [{ review: { nextReviewAt: { lte: now } } }, { review: null }],
				categoryId,
			},
			include: { review: true, examples: true },
			orderBy: [{ review: { nextReviewAt: 'asc' } }, { createdAt: 'asc' }],
			take: limit,
		});
	},
	// busca somente palavras revisadas
	getDueReviews(limit: number, categoryId?: number) {
		return prisma.word.findMany({
			where: {
				review: {
					nextReviewAt: { lte: new Date() },
				},
				categoryId,
			},
			include: { review: true, examples: true },
			orderBy: {
				review: { nextReviewAt: 'asc' },
			},
			take: limit,
		});
	},
	// busca somente palavras novas
	getNewWords(limit: number, categoryId?: number) {
		return prisma.word.findMany({
			where: {
				review: null,
				categoryId,
			},
			include: { examples: true },
			orderBy: { createdAt: 'asc' },
			take: limit,
		});
	},
};
