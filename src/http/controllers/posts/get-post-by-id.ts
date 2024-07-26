import { Request, Response } from "express"
import { z } from "zod"
import { makeGetPostByIdUseCase } from "../../../use-cases/factories/make-get-post-by-id-use-case";

const getPostByIdParams = z.object({
    id: z.string().uuid()
})

export async function getPostById(
    request: Request,
    response: Response
) {
    const { id } = getPostByIdParams.parse(request.params);

    const useCase = makeGetPostByIdUseCase();

    const post = await useCase.execute({ id });

    return response.status(200).send(post);
}