import { Request, Response } from "express"
import { z } from "zod"
import { makeDeletePostUseCase } from "../../../use-cases/factories/make-delete-post-use-case";

const deletePostParams = z.object({
    id: z.string().uuid()
})

export async function deletePost(
    request: Request,
    response: Response
) {
    const { id } = deletePostParams.parse(request.params)

    const useCase = makeDeletePostUseCase();

    const post = await useCase.execute({
        id,
    });

    return response.status(204).send(post);
}