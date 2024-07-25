import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"

interface GetPostByIdUseCaseRequest {
    id: string
}

interface GetPostByIdUseCaseResponse {
    post: Post
}

export class GetPostByIdUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        id
    }: GetPostByIdUseCaseRequest): Promise<GetPostByIdUseCaseResponse> {
    
        const post = await this.postsRepository.getPostById(id)

        return { post }
    }
}