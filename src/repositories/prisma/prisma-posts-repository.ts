import { Prisma } from "@prisma/client";
import { PostsRepository } from "../posts-repository";
import { prisma } from "../../lib/prisma";
import { PostNotFoundError } from "../../errors/post-not-found-error";
import { PaginationRequestProps } from "../../utils/pagination-props";

export class PrismaPostsRepository implements PostsRepository {
    async create(post: Prisma.PostUncheckedCreateInput) {
        const isThereMainPost = await prisma.mainPost.findFirst()

        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                slug: post.slug,
                content: post.content,
                categories: post.categories
            }
        })

        if (!isThereMainPost) {
            await prisma.mainPost.create({
                data: {
                    id: newPost.id
                }
            })
        }

        return newPost
    }

    async getPostById(id: string) {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })

        if (!post) {
            throw new PostNotFoundError()
        }

        return post
    }

    async fetchPosts({ page, perPage }: PaginationRequestProps ) {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc"
            },
            include: {
                categories: true
            },
            skip: (page - 1) * perPage,
            take: perPage
        })


        return posts
    }

    async totalCount() {
        const count = await prisma.post.count()
        return count
    }

    async makePostMain(id: string) {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        })

        if (!post) {
            throw new PostNotFoundError()
        }

        const currentMainPostId = await prisma.mainPost.findFirst()

        if (!currentMainPostId) {
            throw new Error("There are no posts yet.")
        }

        await prisma.mainPost.update({
            where: {
                id: currentMainPostId.id
            },
            data: {
                id: post.id
            }
        })

        return post
    }

    async getMainPost() {
        const currentMainPostId = await prisma.mainPost.findFirst()

        if (!currentMainPostId) {
            throw new Error("There are no posts yet.")
        }
        
        const post = await prisma.post.findUnique({
            where: {
                id: currentMainPostId.id
            },
            include: {
                categories: true
            },
        })

        if (!post) {
            throw new PostNotFoundError()
        }

        return post
    }

    async getPostBySlug(slug: string) {
        const post = await prisma.post.findFirst({
            where: {
                slug
            },
            include: {
                categories: true
            },
        })

        if (!post) {
            throw new PostNotFoundError()
        }

        return post

    }
}
