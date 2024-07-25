import { Request, Response } from "express"
import { makeFetchMenuOptionsUseCase } from "../../../use-cases/factories/make-fetch-menu-options-use-case";

export async function fetchMenuOptions(request: Request, response: Response) {
    const useCase = makeFetchMenuOptionsUseCase()
    const menuOptions = await useCase.execute();
    
    return response.status(200).send(menuOptions);
}