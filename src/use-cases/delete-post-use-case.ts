import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"

interface DeletePostUseCaseRequest {
    id: string,
}

interface DeletePostUseCaseResponse {
    post: Post
}

export class DeletePostUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        id,
    }: DeletePostUseCaseRequest): Promise<DeletePostUseCaseResponse> {


        const post = await this.postsRepository.deletePost(id)

        return {
            post
        }
        
    }
}