import { PrismaCategoriesRepository } from "../../repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "../create-category-use-case";

export function makeCreateCategoryUseCase() {
    const CategorysRepository = new PrismaCategoriesRepository();
    const useCase = new CreateCategoryUseCase(CategorysRepository);

    return useCase
}