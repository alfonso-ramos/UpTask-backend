import type { Request, Response, NextFunction } from "express";
import Project, { ITask } from "../models/Task";

// Adding an atribute to native Request interface of Express
declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExist(req: Request, res: Response, next: NextFunction) {
    try {
        const {taskId} = req.params
        const task = await Project.findById(taskId)

        if (!task) {
            const error = new Error('The task has not been found')
            res.status(404).json({ error: error.message })
        }
        req.task = task
        next()
    } catch (error) {
        res.status(500).json({error:'There was an error'})
    }
}
export async function taskBelongsToProject(req: Request, res: Response, next: NextFunction) {
    if(req.task.project.toString() !== req.project.id.toString()){
        const error = new Error('Not valid action')
        res.status(400).json({error: error.message})
    }
    next()
}