import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { UpdateMainPostUseCase } from "../update-main-post-use-case";

export function makeUpdateMainPostUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new UpdateMainPostUseCase(postsRepository);

    return useCase
}