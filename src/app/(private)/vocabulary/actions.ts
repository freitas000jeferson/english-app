'use server';

import { answerSchema } from '@/features/study/study.schema';
import { StudyService } from '@/features/study/study.service';
import { WordService } from '@/features/word/word.service';

export async function createWordAction(formData: unknown) {
	await WordService.createNew(formData);
}

export async function updateWordAction(id: number, formData: unknown) {
	await WordService.updateExisting(id, formData);
}

export async function deleteWordAction(id: number) {
	await WordService.remove(id);
}

export async function answerWordAction(data: unknown) {
	const input = answerSchema.parse(data);
	return StudyService.answer(input);
}

export async function Action(data: unknown) {
	const input = answerSchema.parse(data);
	return StudyService.answer(input);
}

export async function getStudyQueueAction(limit = 10) {
	return StudyService.getQueue(limit);
}
