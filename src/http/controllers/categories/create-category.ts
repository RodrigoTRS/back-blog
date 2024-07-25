import { Request, Response } from "express"
import { z } from "zod"
import { makeCreateCategoryUseCase } from "../../../use-cases/factories/make-create-category-use-case";

const createCategoryBodySchema = z.object({
    title: z.string(),
})

export async function createCategory(
    request: Request,
    response: Response
) {
    const { title } = createCategoryBodySchema.parse(request.body);

    const useCase = makeCreateCategoryUseCase();

    const category = await useCase.execute({ title });

    return response.status(201).send(category);
}