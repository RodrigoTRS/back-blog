import { Request, Response } from "express"
import { z } from "zod"
import { makeAuthenticateUseCase } from "../../../use-cases/factories/make-authenticate-use-case.ts";
import cookie from 'cookie';


const authenticateUseCaseBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export async function authenticate(
    request: Request,
    response: Response
) {
    const { email, password } = authenticateUseCaseBodySchema.parse(request.body);

    const useCase = makeAuthenticateUseCase();

    try {
        const { token } = await useCase.execute({ email, password });

        response.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/'
        }));

        return response.status(200).send({ message: "Authenticated." });
    } catch (error) {
        console.error(error)
        return response.status(500).send({ error: "Authentication failed"})
    }

}