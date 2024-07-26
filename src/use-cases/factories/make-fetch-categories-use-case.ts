import { PrismaCategoriesRepository } from "../../repositories/prisma/prisma-categories-repository";
import { FetchCategoriesUseCase } from "../fetch-categories-use-case";

export function makeFetchCategoriesUseCase() {
    const CategorysRepository = new PrismaCategoriesRepository();
    const useCase = new FetchCategoriesUseCase(CategorysRepository);

    return useCase
}