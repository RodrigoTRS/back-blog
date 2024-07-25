import { Request, Response } from "express"
import { makeFetchPostsUseCase } from "../../../use-cases/factories/make-fetch-posts-use-case"
import { z } from "zod";

const fetchPostsQueryParams = z.object({
    page: z.string().default("1").transform((val) => parseInt(val, 10)),
    perPage: z.string().default("1000").transform((val) => parseInt(val, 10)),
})

export async function fetchPosts(
    request: Request,
    response: Response
) {
    const { page, perPage } = fetchPostsQueryParams.parse(request.query)

    const useCase = makeFetchPostsUseCase();

    const {
        posts,
        totalPages
    } = await useCase.execute({ page, perPage });

    return response.status(200).send({
        page,
        perPage,
        totalPages,
        posts,
    });
}