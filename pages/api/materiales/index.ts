import { prisma } from "@/service/prisma";
import { Material, InventoryMovement, Enum_MovementType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
    inventoryMovement?: InventoryMovement;
    materiales?: Material[];
    message?: string;
}



const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    if(req.method === 'GET'){
        const materiales = await prisma.material.findMany();
        return res.status(200).json({materiales});
    }
    if (req.method === 'POST') {
        try {
            const { name, quantity, userId, updatedAt } = req.body;

            // Use a transaction to ensure both operations succeed or fail together
            const result = await prisma.$transaction(async (prisma) => {
                // Create the new material
                const newMaterial = await prisma.material.create({
                    data: {
                        name,
                        quantity,
                        userId,
                        updatedAt,
                    },
                });

                // Create the new inventory movement
                const newInventoryMovement = await prisma.inventoryMovement.create({
                    data: {
                        movementType: Enum_MovementType.ENTRADA, // Use the enum value here
                        quantity,
                        materialId: newMaterial.id,
                        userId,
                    },
                });

                return { newMaterial, newInventoryMovement };
            });

            return res.status(201).json({ materiales: [result.newMaterial], inventoryMovement: result.newInventoryMovement });
            
        }catch(error){
            const errorMessage = error as Error;
            return res.status(400).json({message: errorMessage.message});
        }
    }
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;

