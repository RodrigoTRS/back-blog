import { PrismaMenuOptionsRepository } from "../../repositories/prisma/prisma-menu-options-repository";
import { CreateMenuOptionUseCase } from "../create-menu-option-use-case";

export function makeCreateMenuOptionUseCase() {
    const menuOptionsRepository = new PrismaMenuOptionsRepository();
    const useCase = new CreateMenuOptionUseCase(menuOptionsRepository);

    return useCase
}