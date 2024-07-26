import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"
import { generateSlug } from "../utils/generate-slug"

interface CreatePostUseCaseRequest {
    title: string,
    content: string,
    categories: string[]
}

interface CreatePostUseCaseResponse {
    post: Post
}

export class CreatePostUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        title,
        content,
        categories,
    }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {

        const slug = generateSlug(title)

        const post = await this.postsRepository.create({
            title,
            slug,
            content,
            categories
        })

        return {
            post
        }
        
    }
}