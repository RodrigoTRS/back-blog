import { Request, Response } from "express"
import { z } from "zod"
import { makeRegisterUseCase } from "../../../use-cases/factories/make-register-use-case";

const registerUseCaseBodySchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export async function register(
    request: Request,
    response: Response
) {
    const { email, password } = registerUseCaseBodySchema.parse(request.body);

    const useCase = makeRegisterUseCase();

    try {
        const user = await useCase.execute({ email, password });
        return response.status(201).send({ message: "Registered successfully." });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ error: "Registration failed" });
    }

}