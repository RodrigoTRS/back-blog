import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { FetchPostsUseCase } from "../fetch-posts-use-case";

export function makeFetchPostsUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new FetchPostsUseCase(postsRepository);

    return useCase
}