import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

// Adding an atribute to native Request interface of Express
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function projectExist(req: Request, res: Response, next: NextFunction) {
    try {
        const {projectId} = req.params
        const project = await Project.findById(projectId)

        if (!project) {
            const error = new Error('The project has not been found')
            res.status(404).json({ error: error.message })
        }
        req.project = project
        next()
    } catch (error) {
        res.status(500).json({error:'There was an error'})
    }
}