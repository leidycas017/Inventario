import { prisma } from "@/service/prisma";
import { InventoryMovement, Enum_MovementType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
    inventories?: InventoryMovement[];
    message?: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
   if(req.method === 'GET'){
        const inventories = await prisma.inventoryMovement.findMany();
        return res.status(200).json({inventories});
    }

    if (req.method === 'POST') {
        try {
            const { movementType, materialId, quantity, userId} = req.body;

            if (!materialId || !quantity || !userId || !movementType) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const result = await prisma.$transaction(async (prisma) => {
                             
                // Crear nuevo movimiento
                const newInventoryMovement = await prisma.inventoryMovement.create({
                    data: {
                        movementType,
                        quantity,
                        materialId,
                        userId,
                    },
                });

                // Actualizar cantidad material
                const material = await prisma.material.findUnique({ where: { id: materialId } });
                if (!material) {
                    throw new Error('Material not found');
                }

                const newQuantity = movementType === Enum_MovementType.ENTRADA
                ? material.quantity + quantity
                : material.quantity - quantity;

                await prisma.material.update({
                    where: { id: materialId },
                    data: { quantity: newQuantity },
            });

                return {newInventoryMovement };
            });

            return res.status(201).json({ inventories: [result.newInventoryMovement]});
            
        }catch(error){
            const errorMessage = error as Error;
            return res.status(400).json({message: errorMessage.message});
        }
    }
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;