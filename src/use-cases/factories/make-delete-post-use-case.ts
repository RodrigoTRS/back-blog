import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { DeletePostUseCase } from "../delete-post-use-case";

export function makeDeletePostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new DeletePostUseCase(postsRepository);

    return useCase
}