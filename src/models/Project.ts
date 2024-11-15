import mongoose, {Schema, Document} from "mongoose"

export type ProjectType = Document & {
    projectName: string,
    clientName: string,
    description: string
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        require: true,
        trim: true
    },
    clientName: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    },
})

const Project = mongoose.model<ProjectType>('Project', ProjectSchema)

export default Project