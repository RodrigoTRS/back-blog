import { Request, Response } from "express"
import { z } from "zod"
import { makeCreateMenuOptionUseCase } from "../../../use-cases/factories/make-create-menu-option-use-case"

const createMenuOptionBodySchema = z.object({
    title: z.string(),
})

export async function createMenuOption(
    request: Request,
    response: Response
) {
    const { title } = createMenuOptionBodySchema.parse(request.body);

    const useCase = makeCreateMenuOptionUseCase();

    const menuOption = await useCase.execute({ title });

    return response.status(201).send(menuOption);
}