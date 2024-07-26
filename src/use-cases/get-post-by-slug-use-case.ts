import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"

interface GetPostBySlugUseCaseRequest {
    slug: string
}

interface GetPostBySlugUseCaseResponse {
    post: Post
}

export class GetPostBySlugUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        slug
    }: GetPostBySlugUseCaseRequest): Promise<GetPostBySlugUseCaseResponse> {
    
        const post = await this.postsRepository.getPostBySlug(slug)

        return { post }
    }
}