import { Request, Response } from "express"
import cookie from 'cookie';


export async function logout(
    request: Request,
    response: Response
) {
    response.setHeader('Set-Cookie', cookie.serialize('jwt', '', {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
    }));

    return response.status(200).send({ message: "Logged out." });

}