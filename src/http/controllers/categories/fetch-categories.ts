import { Request, Response } from "express"
import { makeFetchCategoriesUseCase } from "../../../use-cases/factories/make-fetch-categories-use-case"

export async function fetchCategories(request: Request, response: Response) {
    const useCase = makeFetchCategoriesUseCase()
    const categories = await useCase.execute();
    
    return response.status(200).send(categories);
}