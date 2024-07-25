import { Request, Response } from "express"
import { makeUpdateMainPostUseCase } from "../../../use-cases/factories/make-update-main-post-use-case";
import { z } from "zod";

const updateMainPostParams = z.object({
    id: z.string().uuid()
})

export async function updateMainPost(
    request: Request,
    response: Response
) {

    const { id } = updateMainPostParams.parse(request.params)

    const useCase = makeUpdateMainPostUseCase();

    const post = await useCase.execute({ id });

    return response.status(200).send(post);
}