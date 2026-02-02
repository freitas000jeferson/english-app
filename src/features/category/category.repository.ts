import { prisma } from '@/lib/prisma';

export const CategoryRepository = {
	async findAll() {
		return prisma.category.findMany({
			orderBy: { name: 'asc' },
			include: {
				_count: {
					select: { words: true },
				},
			},
		});
	},
	async findById(id: number) {
		return prisma.category.findUnique({ where: { id } });
	},
	async findByName(name: string) {
		return prisma.category.findMany({ where: { name } });
	},
};
