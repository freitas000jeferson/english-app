import { prisma } from '@/lib/prisma';
import type { WordInput } from './word.schema';

export const WordRepository = {
	async create(data: WordInput) {
		return prisma.word.create({
			data: {
				en: data.en,
				pt: data.pt,
				description: data.description,
				imageUrl: data.imageUrl,
				categoryId: data.categoryId,
				examples: {
					create: data.examples,
				},
			},
		});
	},

	async findAll(limit = 20) {
		return prisma.word.findMany({ orderBy: { createdAt: 'asc' }, take: limit });
	},
	async findByCategory(id: number) {
		return prisma.word.findMany({
			where: { categoryId: id },
			include: {
				category: true,
				examples: true,
			},
		});
	},

	async findById(id: number) {
		return prisma.word.findUnique({
			where: { id },
			include: {
				category: true,
				examples: true,
			},
		});
	},

	async update(id: number, data: WordInput) {
		return prisma.word.update({
			where: { id },
			data: {
				en: data.en,
				pt: data.pt,
				description: data.description,
				imageUrl: data.imageUrl,
				categoryId: data.categoryId,
				examples: {
					deleteMany: {},
					create: data.examples,
				},
			},
		});
	},

	async delete(id: number) {
		return prisma.word.delete({ where: { id } });
	},
};
