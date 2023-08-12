import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express'
const prisma = new PrismaClient();

const app = express();

app.get('/', async (req: Request, res: Response) => {
    const groupMembers = await prisma.group.findMany({
        include: {members: true}
    });

    res.json({groupMembers})
});

app.post('/', async (req: Request, res: Response) => {
    const group = await prisma.group.create({
        data:{
            name:"Mesh Heads",
            yearEst: 2023
        }
    })

    res.json({group})
});

app.listen(3001);