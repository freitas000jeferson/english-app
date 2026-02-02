import { WordRepository } from './word.repository';
import { wordSchema } from './word.schema';

export const WordService = {
	async list(limit = 10) {
		return await WordRepository.findAll(limit);
	},
	async get(id: number) {
		return await WordRepository.findById(id);
	},
	async createNew(input: unknown) {
		const data = wordSchema.parse(input);
		return await WordRepository.create(data);
	},

	async updateExisting(id: number, input: unknown) {
		const data = wordSchema.parse(input);
		return await WordRepository.update(id, data);
	},

	async remove(id: number) {
		return await WordRepository.delete(id);
	},
};
