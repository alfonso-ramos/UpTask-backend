import type { Request, Response} from "express"
import Project from "../models/Project"
export class ProjectController {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)
        try {
            await project.save()
            res.send("Project has been created")
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})
            res.json(projects)
        } catch (error) {
            console.log(error)
        }

        res.send('All the projects')
    }
    static getProjectById = async (req : Request, res: Response) => {
        const {id} = req.params
        try {
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('The project has not been found')
                res.status(404).json({error: error.message})
            }
            res.json(project)
        } catch (error) {
            console.log(error)
        }
    }
}
