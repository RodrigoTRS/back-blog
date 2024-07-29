import { PrismaUsersRepository } from "../../repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate-use-case";

export function makeAuthenticateUseCase() {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new AuthenticateUseCase(usersRepository);

    return useCase
}