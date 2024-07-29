import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken"
import { env } from "../../env";

interface RequestWithUsedId extends Request {
    user_id: string
}

interface JwtPayload {
    user_id: string
}

export function verifyToken(
    request: RequestWithUsedId,
    response: Response,
    next: NextFunction
) {
    const token = request.header("Authorization")
    if (!token) return response.status(401).json({ error: 'Access denied' });

    try {
        const decoded = verify(token, env.SECRET_KEY) as JwtPayload;
        request.user_id = decoded.user_id;
        next();
    } catch (error) {
        response.status(401).json({ error: 'Invalid token' });
    }
}
   