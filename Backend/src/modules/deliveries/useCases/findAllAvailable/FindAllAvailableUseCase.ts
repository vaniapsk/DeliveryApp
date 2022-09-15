import { prisma } from "../../../../database/prismaClient";


export class FindAllAvailableUseCase {
    async execute() {
        const deliveries = await prisma.deliveries.findMany({
            where: {
                id_deliveryman: null,
                ended_at: null
            }
        });
        return deliveries;
    }
}