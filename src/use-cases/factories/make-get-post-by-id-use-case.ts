import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { GetPostByIdUseCase } from "../get-post-by-id-use-case";

export function makeGetPostByIdUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new GetPostByIdUseCase(postsRepository);

    return useCase
}