import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"
import { generateSlug } from "../utils/generate-slug"

interface UpdatePostUseCaseRequest {
    id: string,
    title: string,
    content: string,
    categories: string[]
}

interface UpdatePostUseCaseResponse {
    post: Post
}

export class UpdatePostUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        id,
        title,
        content,
        categories,
    }: UpdatePostUseCaseRequest): Promise<UpdatePostUseCaseResponse> {

        const slug = generateSlug(title)

        const post = await this.postsRepository.update({
            id,
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