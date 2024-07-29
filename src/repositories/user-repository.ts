import { User } from "@prisma/client";

export interface UserCredentials {
    email: string,
    password: string
}

export interface UsersRepository {
    register(credentials: UserCredentials): Promise<User>
    getByEmail(email: string): Promise<User>
}
