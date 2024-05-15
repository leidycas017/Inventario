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
    
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;
