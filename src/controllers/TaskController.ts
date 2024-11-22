import {request, type Request, type Response} from 'express'
import Task from '../models/Task'

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)

            // All promises needed has been completed
            await Promise.allSettled([task.save(), req.project.save()])
            res.send('Task created succesfully')
        } catch (error) {
            res.status(500).json({error: "There was an error"})
        }
    }
    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({project: req.project.id}).populate('project')
            res.json(tasks)
        } catch (error) {
            res.status(500).json({error: "There was an error"})
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            const {taskId} = req.params
            const task = await Task.findById(taskId)

            if(!task){
                const error = new Error('Task has been not found')
                res.status(404).json({error: error.message})
            }
            if(task.project.toString() !== req.project.id){
                const error = new Error('Not valid action')
                res.status(400).json({error: error.message})
            }
            res.json(task)
        } catch (error) {
            res.status(500).json({error: "There was an error"})
        }
    }
}