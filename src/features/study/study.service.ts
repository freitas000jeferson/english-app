import { sm2 } from './anki';
import { StudyRepository } from './study.repository';
import type { AnswerInput } from './study.schema';

const MAX_REVIEWS = 20;
const MAX_NEW = 5;
export const StudyService = {
	async answer(input: AnswerInput) {
		const { wordId, grade } = input;

		const review = await StudyRepository.findReview(wordId);

		const next = sm2(grade, review ?? undefined);

		if (review) {
			return StudyRepository.updateReview(wordId, {
				...next,
				lastGrade: grade,
			});
		}

		return StudyRepository.createReview({
			wordId,
			...next,
			lastGrade: grade,
		});
	},

	async getQueue(limit = 10, categoryId?: number) {
		return StudyRepository.getStudyQueue(limit, categoryId);
	},
	// busca mesclada
	async getQueueV2(categoryId?: number) {
		const reviews = await StudyRepository.getDueReviews(MAX_REVIEWS, categoryId);
		const newWords = await StudyRepository.getNewWords(MAX_NEW, categoryId);

		return interleave(reviews, newWords);
	},
};
function interleave<T>(a: T[], b: T[]) {
	const result: T[] = [];
	let i = 0;

	while (i < a.length || i < b.length) {
		if (i < a.length) result.push(a[i]);
		if (i < b.length) result.push(b[i]);
		i++;
	}

	return result;
}
