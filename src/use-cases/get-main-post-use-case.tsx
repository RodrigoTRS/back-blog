import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"


interface GetMainPostUseCaseResponse {
    post: Post
}

export class GetMainPostUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute(): Promise<GetMainPostUseCaseResponse> {
    
        const post = await this.postsRepository.getMainPost()

        return { post }
    }
}