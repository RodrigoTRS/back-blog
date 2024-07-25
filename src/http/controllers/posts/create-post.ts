import { Request, Response } from "express"
import { z } from "zod"
import { makeCreatePostUseCase } from "../../../use-cases/factories/make-create-post-use-case";

const createPostBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    categories: z.array(z.string())
})

export async function createPost(
    request: Request,
    response: Response
) {
    const { title, content, categories } = createPostBodySchema.parse(request.body);

    const useCase = makeCreatePostUseCase();

    const post = await useCase.execute({
        title,
        content,
        categories
    });

    return response.status(200).send(post);
}