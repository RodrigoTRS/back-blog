import { Request, Response } from "express"
import { makeGetMainPostUseCase } from "../../../use-cases/factories/make-get-main-post-use-case";


export async function getMainPost(
    request: Request,
    response: Response
) {
    const useCase = makeGetMainPostUseCase();

    const post = await useCase.execute();

    return response.status(200).send(post);
}