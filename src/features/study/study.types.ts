/** Status
 * Errei
 * Dificil
 * Bom
 * Fácil
 * */
export type Grade = 0 | 1 | 2 | 3;

/** Valores iniciais padrão:
	interval = 1 // dias até próxima revisão
	ease = 2.5  // fator de facilidade (ex: 2.5)
	repetitions = 0 // quantas vezes acertou
	nextReviewAt = hoje // quando revisar novamente
*/
export type ReviewState = {
	interval: number;
	easeFactor: number;
	repetitions: number;
};
