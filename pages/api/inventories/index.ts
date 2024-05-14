import { prisma } from "@/service/prisma";
import { InventoryMovement } from "@prisma/client";
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

    if(req.method === 'POST'){
        try{
            const{movementType, quantity, materialId, userId} = req.body;
            const newInventoryMovement = await prisma.inventoryMovement.create({
                data:{
                    movementType,
                    quantity,
                    materialId,
                    userId, 
                },
            });
            return res.status(201).json({ inventories: [newInventoryMovement] });
        }catch(error){
            const errorMessage = error as Error;
            return res.status(400).json({message: errorMessage.message});
        }
    }
    
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;
