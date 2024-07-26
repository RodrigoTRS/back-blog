import { Request, Response } from "express"
import { z } from "zod"
import { makeUpdatePostUseCase } from "../../../use-cases/factories/make-update-post-use-case";

const updatePostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    categories: z.array(z.string())
})

const updatePostParams = z.object({
    id: z.string().uuid()
})

export async function updatePost(
    request: Request,
    response: Response
) {
    const { title, content, categories } = updatePostBodySchema.parse(request.body);
    const { id } = updatePostParams.parse(request.params)

    const useCase = makeUpdatePostUseCase();

    const post = await useCase.execute({
        id,
        title,
        content,
        categories
    });

    return response.status(204).send(post);
}