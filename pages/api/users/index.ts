import {User, PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from 'next';

const prisma = new PrismaClient();

interface Response {
    users?: User[];
    user?: User;
    message?: string;
}

const handler = async (req: NextApiRequest, res:NextApiResponse<Response>) =>{
    if(req.method === 'GET'){
        const users = await prisma.user.findMany();
        return res.status(200).json({users});
    }
if(req.method === 'POST'){
    try{
        const{email, name, roleId} = req.body;
        const newUser = await prisma.user.create({
            data:{
                email,
                name,
                roleId,
            },
        });
        return res.status(201).json({user:newUser});
    }catch(error){
        const errorMessage = error as Error;
        return res.status(400).json({message: errorMessage.message});
    }
}
    return res.status(405).json({message: 'Method not allowed'});
};

export default handler;