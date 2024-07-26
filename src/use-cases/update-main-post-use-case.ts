import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"

interface UpdateMainPostUseCaseRequest {
    id: string
}

interface UpdateMainPostUseCaseResponse {
    post: Post
}

export class UpdateMainPostUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        id
    }: UpdateMainPostUseCaseRequest): Promise<UpdateMainPostUseCaseResponse> {
    
        const post = await this.postsRepository.makePostMain(id)

        return { post }
    }
}