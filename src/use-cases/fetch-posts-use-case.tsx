import { Post } from "@prisma/client"
import { PostsRepository } from "../repositories/posts-repository"
import { PaginationRequestProps } from "../utils/pagination-props"

interface FetchPostsUseCaseResponse {
    page: number
    perPage: number
    totalPages: number
    posts: Post[]
}

export class FetchPostsUseCase {
    constructor(
        private postsRepository: PostsRepository
    ) {}

    async execute({
        page,
        perPage
    }: PaginationRequestProps ): Promise<FetchPostsUseCaseResponse> {

        const [
            posts,
            count
        ] = await Promise.all([
            this.postsRepository.fetchPosts({ page, perPage }),
            this.postsRepository.totalCount()
        ])

        const totalPages = Math.ceil(count/perPage)

        return {
            page,
            perPage,
            totalPages,
            posts
        }
    }
}