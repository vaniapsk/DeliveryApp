import { Request, Response } from "express";
import { prisma } from "../../../../database/prismaClient";
import { FindAllAvailableUseCase } from "./FindAllAvailableUseCase";

export class FindAllAvailableController {
    async handle(request: Request, response: Response) {
        const findAllAvailableUseCase = new FindAllAvailableUseCase;
        const deliveries = await findAllAvailableUseCase.execute();

        return response.json(deliveries);
    }
}