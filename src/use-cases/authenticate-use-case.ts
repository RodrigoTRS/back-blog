import { User } from "@prisma/client"
import { UsersRepository } from "../repositories/user-repository"
import { compare } from "bcrypt"
import { AuthenticationError } from "../errors/authentication-error"
import jwt from "jsonwebtoken"
import { env } from "../env"

interface AuthenticateUseCaseRequest {
    email: string,
    password: string
}

interface AuthenticateUseCaseResponse {
    token: string
}

export class AuthenticateUseCase {
    constructor(
        private usersRepository: UsersRepository
    ) {}

    async execute({
        email,
        password
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        try {
            const user = await this.usersRepository.getByEmail(email)
            const passwordMatch = await compare(password, user.password)

            if (!passwordMatch) {
                throw new AuthenticationError()
            }

            const token = jwt.sign({ user_id: user.id }, env.SECRET_KEY, {
                expiresIn: "1h"
            })

            return { token }
        } catch (error) {
            throw new AuthenticationError()
        }
        
    }
}