import words from '../data/words_01.json';
import { prisma } from '../src/lib/prisma';

type WordData = {
	en: string;
	pt: string;
	category?: string;
	description?: string;
	imageUrl?: string;
	examples?: Array<{
		affirmativeEn?: string;
		affirmativePt?: string;
		negativeEn?: string;
		negativePt?: string;
		interrogativeEn?: string;
		interrogativePt?: string;
		affirmative?: { en: string; pt: string };
		negative?: { en: string; pt: string };
		interrogative?: { en: string; pt: string };
	}>;
};

async function createCategoryIfNotExists(categoryName: string) {
	const formattedName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
	let category = await prisma.category.findUnique({
		where: { name: formattedName },
	});
	if (!category) {
		category = await prisma.category.create({
			data: { name: formattedName },
		});
	}
	return category.id;
}
async function run() {
	let created = 0;
	for (const w of words as WordData[]) {
		try {
			if (!w.en || !w.pt) {
				console.warn('Skipping entry missing en/pt', w);
				continue;
			}

			const categoryId = await createCategoryIfNotExists(w.category ?? 'General');

			// skip if same word in same category already exists
			const existing = await prisma.word.findFirst({
				where: { en: w.en, categoryId },
			});
			if (existing) {
				console.log(`Skipping existing word: ${w.en} (${w.category ?? 'General'})`);
				continue;
			}

			const data: any = {
				en: w.en,
				pt: w.pt,
				categoryId,
			};
			if (w.description) data.description = w.description;
			if (w.imageUrl) data.imageUrl = w.imageUrl;

			// handle examples if present
			if (Array.isArray(w.examples) && w.examples.length > 0) {
				data.examples = {
					create: w.examples.map((ex: any) => {
						const obj = {
							affirmativeEn: ex.affirmativeEn ?? ex.affirmative?.en ?? '',
							affirmativePt: ex.affirmativePt ?? ex.affirmative?.pt ?? '',
							negativeEn: ex.negativeEn ?? ex.negative?.en ?? '',
							negativePt: ex.negativePt ?? ex.negative?.pt ?? '',
							interrogativeEn: ex.interrogativeEn ?? ex.interrogative?.en ?? '',
							interrogativePt: ex.interrogativePt ?? ex.interrogative?.pt ?? '',
						};
						return obj;
					}),
				};
			}

			await prisma.word.create({ data });
			created++;
		} catch (err) {
			console.error('Failed to import word', w, err);
		}
	}

	console.log(`Import complete. Created ${created} words.`);
	await prisma.$disconnect();
}

run();
