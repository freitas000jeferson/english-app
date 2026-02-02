import { fetchDictionary } from '@/features/dictionary/dictionary.service';
import { prisma } from '@/lib/prisma';
import { detectAbstract } from '@/utils/detectAbstractWords';
import words from '../data/words_01.json';

type WordData = {
	en: string;
	pt: string;
	category?: string;
	description?: string;
	imageUrl?: string;
	gifUrl?: string;
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

			// skip if same word already exists (schema has unique en)
			const existing = await prisma.word.findUnique({
				where: { en: w.en },
			});
			if (existing) {
				console.log(`Skipping existing word: ${w.en}`);
				continue;
			}

			// fetch dictionary data
			const dict = await fetchDictionary(w.en); // returns array or null
			if (!dict) console.warn(`No dictionary data for "${w.en}"`);

			// determine abstractness and partOfSpeech (from first meaning if available)
			const isAbstract = detectAbstract(w.en, dict);
			const partOfSpeech = (dict?.[0]?.meanings?.[0]?.partOfSpeech as string) ?? null;

			const categoryId = await createCategoryIfNotExists(w.category ?? 'General');

			const data: any = {
				en: w.en,
				pt: w.pt,
				categoryId,
				dictionary: dict ?? null,
				isAbstract,
				partOfSpeech,
			};

			if (w.description) data.description = w.description;
			if (w.imageUrl) data.imageUrl = w.imageUrl;
			if (w.gifUrl) data.gifUrl = w.gifUrl;

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
			console.error('❌ Failed to import word', w, err);
		}
	}

	console.log(`Import complete. Created ${created} words.`);
	await prisma.$disconnect();
}

run();
