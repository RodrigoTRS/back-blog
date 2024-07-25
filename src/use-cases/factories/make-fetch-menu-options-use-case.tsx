import { PrismaMenuOptionsRepository } from "../../repositories/prisma/prisma-menu-options-repository";
import { FetchMenuOptionsUseCase } from "../fetch-menu-options-use-case";

export function makeFetchMenuOptionsUseCase() {
    const menuOptionsRepository = new PrismaMenuOptionsRepository();
    const useCase = new FetchMenuOptionsUseCase(menuOptionsRepository);

    return useCase
}