import { PrismaCategoriesRepository } from "../../repositories/prisma/prisma-categories-repository";
import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { CreatePostUseCase } from "../create-post-use-case";

export function makeCreatePostUseCase() {
    const categoriesRepository = new PrismaCategoriesRepository();
    const postsRepository = new PrismaPostsRepository();
    const useCase = new CreatePostUseCase(categoriesRepository, postsRepository);

    return useCase
}