import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
    username: string;
    password: string;
}

export class AuthenticateClientUseCase {
    async execute({ username, password }: IAuthenticateClient) {
        const client = await prisma.clients.findFirst({
            where: { username }
        });

        if (!client) {
            throw new Error("Invalid username or password");
        }

        const passwordMatch = await compare(password, client.password);

        if (!passwordMatch) {
            throw new Error("Invalid username or password");
        }
        const token = sign({ username }, 'c06f0bdbe80a61f065aefa2f2f501478', {
            subject: client.id,
            expiresIn: '1d'
        });

        return token;
    }
}