import { User } from "@prisma/client"
import { UsersRepository } from "../repositories/user-repository"
import { hash } from "bcrypt"
import { RegisterError } from "../errors/register-error"

interface RegisterUseCaseRequest {
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({
        email,
        password
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {

        const hashedPassword = await hash(password, 10)

        try {
            const user = await this.usersRepository.register({
                email,
                password: hashedPassword
            })

            return { user }
        } catch (error) {
            throw new RegisterError()
        }
        
    }
}