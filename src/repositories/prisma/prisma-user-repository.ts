import { prisma } from "../../lib/prisma";
import { UserCredentials, UsersRepository } from "../user-repository";
import { UserNotFoundError } from "../../errors/user-not-found-error"




export class PrismaUsersRepository implements UsersRepository {
    async register(credentials: UserCredentials) {
        const user = await prisma.user.create({
            data: {
                email: credentials.email,
                password: credentials.password
            }
        })

        return user
    }

    async getByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new UserNotFoundError()
        }

        return user
    }
}
