import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { GetMainPostUseCase } from "../get-main-post-use-case";

export function makeGetMainPostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new GetMainPostUseCase(postsRepository);

    return useCase
}