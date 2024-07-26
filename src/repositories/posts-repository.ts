import { Post } from "@prisma/client";
import { PaginationRequestProps } from "../utils/pagination-props";


export interface CreatePostRequest {
    title: string,
    slug: string,
    content: string,
    categories: string[]
}

export interface PostsRepository {
    create(post: CreatePostRequest): Promise<Post>
    getPostById(id: string): Promise<Post>
    getPostBySlug(slug: string): Promise<Post>
    fetchPosts({page, perPage }: PaginationRequestProps): Promise<Post[]>
    totalCount(): Promise<number>
    makePostMain(id: string): Promise<Post>
    getMainPost(): Promise<Post>
}
