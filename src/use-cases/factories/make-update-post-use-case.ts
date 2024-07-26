import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { UpdatePostUseCase } from "../update-post-use-case";

export function makeUpdatePostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new UpdatePostUseCase(postsRepository);

    return useCase
}