import { PrismaPostsRepository } from "../../repositories/prisma/prisma-posts-repository";
import { GetPostBySlugUseCase } from "../get-post-by-slug-use-case";

export function makeGetPostBySlugUseCase() {
    const postsRepository = new PrismaPostsRepository();
    const useCase = new GetPostBySlugUseCase(postsRepository);

    return useCase
}