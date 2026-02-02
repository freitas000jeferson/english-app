import { CategoryRepository } from './category.repository';

export const CategoryService = {
	async list() {
		return CategoryRepository.findAll();
	},

	async get(id: number) {
		return CategoryRepository.findById(id);
	},

	async getByName(name: string) {
		return CategoryRepository.findByName(name);
	},
};
