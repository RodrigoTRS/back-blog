import { Category } from "@prisma/client"
import { generateSlug } from "../utils/generate-slug"
import { CategoriesRepository } from "../repositories/categories-repository"

interface CreateCategoryUseCaseRequest {
    title: string,
}

interface CreateCategoryUseCaseResponse {
    category: Category
}

export class CreateCategoryUseCase {
    constructor(
        private categoriesRepository: CategoriesRepository
    ) {}

    async execute({
        title,
    }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {

        const slug = generateSlug(title)

        const category = await this.categoriesRepository.create({
            title,
            slug,
        })

        return {
            category
        }
        
    }
}