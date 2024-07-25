import { Post, Prisma } from "@prisma/client";
import { PaginationRequestProps } from "../utils/pagination-props";

export interface PostsRepository {
    create(post: Prisma.PostUncheckedCreateInput): Promise<Post>
    getPostById(id: string): Promise<Post>
    getPostBySlug(slug: string): Promise<Post>
    fetchPosts({page, perPage }: PaginationRequestProps): Promise<Post[]>
    totalCount(): Promise<number>
    makePostMain(id: string): Promise<Post>
    getMainPost(): Promise<Post>
}
