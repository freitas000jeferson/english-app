export type Category = {
	id: number;
	name: string;
	words: Word[];
};
export type Word = {
	id: number;
	pt: string;
	en: string;
	description: string;
	imageUrl?: string;
	categoryId: number;
	category: Category;
	examples: Example[];
};
export type Example = {
	id: string;
	wordId: number;
	word: Word;

	affirmativePt: string;
	affirmativeEn: string;
	negativePt: string;
	negativeEn: string;
	interrogativePt: string;
	interrogativeEn: string;
};

export type Review = {
	id: string;
	wordId: number;
	word: Word;

	interval: number; // dias até próxima revisão
	ease: number; // fator de facilidade (ex: 2.5)
	repetitions: number; // quantas vezes acertou
	dueDate: Date; // quando revisar novamente

	createdAt: Date;
	updatedAt: Date;
};
/** Valores iniciais padrão:
    interval = 1
    ease = 2.5
    repetitions = 0
    dueDate = hoje
*/
