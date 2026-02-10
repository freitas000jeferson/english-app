import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@prisma/client';
import categories from './seeds/categories_01.json';

type CategoryData = {
	name: string;
	slug: string;
	level: string;
	description: string;
};
const adapter = new PrismaBetterSqlite3({
	url: 'file:./prisma/dev.db',
});
const prisma = new PrismaClient({
	adapter,
});

async function run() {
	let created = 0;

	for (const c of categories as CategoryData[]) {
		try {
			const category = await prisma.category.findUnique({
				where: { slug: c.slug },
			});
			if (category) {
				continue;
			}
			const data = {
				name: c.name,
				slug: c.slug,
				level: c.level ?? 'A1',
				description: c.description,
			};
			await prisma.category.create({
				data,
			});
			created++;
		} catch (err) {
			console.error('❌ Failed to import category', c, err);
		}
	}
	console.log(`Import complete. Created ${created} categories.`);
	await prisma.$disconnect();
}

run();
