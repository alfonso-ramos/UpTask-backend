import type { Request, Response } from "express"
import Project from "../models/Project"
import Task from "../models/Task"
export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        project.manager = req.user.id
        
        try {
            await project.save()
            res.send("Project has been created")
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    {manager: {$in: req.user.id}},
                    {team: {$in: req.user.id}}
                ]
            })
            res.status(200).json(projects)
        } catch (error) {
            res.status(500).json({ message: "Error to get the projects" })
            console.log(error)
        }
        // res.send('All the projects')
    }
    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id).populate('tasks')
            if (!project) {
                const error = new Error('The project has not been found')
                res.status(404).json({ error: error.message })
            }

            if(project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)){
                const error = new Error('Not valid action')
                res.status(404).json({ error: error.message })
            }
            
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('The project has not been found')
                res.status(404).json({ error: error.message })
            }

            if(project.manager.toString() !== req.user.id.toString()){
                const error = new Error('Just the manager can update the project')
                res.status(404).json({ error: error.message })
            }

            project.clientName = req.body.clientName
            project.projectName = req.body.projectName
            project.description = req.body.description

            await project.save()
            res.send('Project has been updated')

        } catch (error) {
            console.log(error)
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const project = await Project.findById(id)
            if (!project) {
                const error = new Error('The project has not been found')
                res.status(404).json({ error: error.message })
            }


            if(project.manager.toString() !== req.user.id.toString()){
                const error = new Error('Just the manager can delete the project')
                res.status(404).json({ error: error.message })
            }
            
            await project.deleteOne()

            res.send('Project deleted')

        } catch (error) {
            console.log(error)
        }
    }
}
