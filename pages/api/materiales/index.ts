import { prisma } from "@/service/prisma";
import { Material } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
    materiales?: Material[];
    message?: string;
}



const handler = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    if(req.method === 'GET'){
        const materiales = await prisma.material.findMany();
        return res.status(200).json({materiales});
    }
    if(req.method === 'POST'){
        try{
            const{name, quantity, userId, updatedAt} = req.body;
            const newMaterial = await prisma.material.create({
                data:{
                    name,
                    quantity,
                    userId,
                    updatedAt, 
                },
            });
            return res.status(201).json({ materiales: [newMaterial] });
        }catch(error){
            const errorMessage = error as Error;
            return res.status(400).json({message: errorMessage.message});
        }
    }
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;