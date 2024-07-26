import { Request, Response } from "express"
import { makeGetPostCountUseCase } from "../../../use-cases/factories/make-get-post-count-use-case";

export async function getPostCount(
    request: Request,
    response: Response
) {
    const useCase = makeGetPostCountUseCase();

    const post = await useCase.execute();

    return response.status(200).send(post);
}