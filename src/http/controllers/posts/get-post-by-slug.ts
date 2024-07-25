import { Request, Response } from "express"
import { z } from "zod"
import { makeGetPostBySlugUseCase } from "../../../use-cases/factories/make-get-post-by-slug-use-case";

const getPostBySlugBodySchema = z.object({
    slug: z.string()
})

export async function getPostBySlug(
    request: Request,
    response: Response
) {
    const { slug } = getPostBySlugBodySchema.parse(request.params);

    const useCase = makeGetPostBySlugUseCase();

    const post = await useCase.execute({ slug });

    return response.status(200).send(post);
}