import type { ReviewState } from './study.types';

export function sm2(grade: number, state?: ReviewState) {
	let interval = state?.interval ?? 0;
	let easeFactor = state?.easeFactor ?? 2.5;
	let repetitions = state?.repetitions ?? 0;

	if (grade < 2) {
		repetitions = 0;
		interval = 1;
	} else {
		repetitions += 1;

		if (repetitions === 1) interval = 1;
		else if (repetitions === 2) interval = 6;
		else interval = Math.round(interval * easeFactor);

		easeFactor = easeFactor + (0.1 - (3 - grade) * (0.08 + (3 - grade) * 0.02));

		if (easeFactor < 1.3) easeFactor = 1.3;
	}

	const nextReviewAt = new Date();
	nextReviewAt.setDate(nextReviewAt.getDate() + interval);

	return {
		interval,
		easeFactor,
		repetitions,
		nextReviewAt,
	};
}
