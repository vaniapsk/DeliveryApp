import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticateDeliveryman(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({
            message: "Token missing"
        });
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub } = verify(token, "4a6cfc346fcca7d814f7a3ac986197f1") as IPayload;
        request.id_deliveryman = sub;

        console.log(sub);
        return next();
    } catch (error) {
        return response.status(401).json({
            message: "Ivalid token!"
        });
    }
}