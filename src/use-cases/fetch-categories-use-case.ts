import { Category } from "@prisma/client"
import { CategoriesRepository } from "../repositories/categories-repository"

interface FetchCategoriesUseCaseResponse {
    categories: Category[]
}

export class FetchCategoriesUseCase {
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute(): Promise<FetchCategoriesUseCaseResponse> {
        const categories = await this.categoriesRepository.fetchAll()
        return {
            categories
        }
    }
}