import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { GetPostCountUseCase } from "../get-post-count-use-case";

export function makeGetPostCountUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new GetPostCountUseCase(postsRepository);

    return useCase
}