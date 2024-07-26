import { PostsRepository } from "../repositories/posts-repository"

interface GetPostCountUseCaseResponse {
    count: number
}

export class GetPostCountUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute(): Promise<GetPostCountUseCaseResponse> {


        const count = await this.postsRepository.totalCount()

        return {
            count
        }
        
    }
}