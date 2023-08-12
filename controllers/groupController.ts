//prisma client 
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


//Express response types
import express, {Request, Response} from 'express'


//@desc Get all groups
//@route GET /api/groups
//@access public
const getGroups = async (req: Request, res: Response) => {
    const groupMembers = await prisma.group.findMany({
        include: {members: true},
    });
    
    console.log("Retrieved all groups (displaying first 100): ", groupMembers[100]);
    res.json({groupMembers})
}

//@desc Create new group
//@route POST /api/groups
//@access public
const createGroup = async (req: Request, res: Response) => {
    //check request body for correct information
    const {name,yearEst} = req.body;

    if(!name || !yearEst){
        res.status(400)
        throw new Error("All fields are mandatory!");
    }
    
    const group = await prisma.group.create({
        data:{
            name: req.body.name,
            yearEst: req.body.yearEst,
            members: req.body.members,
            genres: req.body.members
        }
    })

    console.log("Created new group: ", group);
    res.status(201).json({group});
};

//@desc Get group by id
//@route POST /api/group/:id
//@access public
const getGroupById = async(req: Request, res: Response) => {
    const group = await prisma.group.findUnique({
        where:{
            id: req.params.id,
        }
    })
    
    res.status(200).json({ message: group });
};

//@desc Update group by id
//@route PUT /api/group/:id
//@access public
const updateGroupById = async(req: Request, res: Response) => {
    const group = await prisma.group.update({
        where:{
            id: req.params.id,
        },
        data:{
            name: req.body.name,
            yearEst: req.body.yearEst,
            members: req.body.members,
            genres: req.body.members
        }
    })
    
    res.status(200).json({ message: 'Updated group: ', group });
};

//@desc Delete group by id
//@route DELETE /api/group/:id
//@access public
const deleteGroupById = async(req: Request, res: Response) => {
    const group = await prisma.group.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message: "Deleted group." , group});
};

module.exports = { 
    getGroups, 
    getGroupById, 
    createGroup, 
    updateGroupById, 
    deleteGroupById 
};