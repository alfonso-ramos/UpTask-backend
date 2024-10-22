import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.cyan.bold(`MongoDB conectado en: ${url}`))
    } catch (error) {
        console.log(colors.red.bold("Error al conectarse a la base de datos."))
        process.exit(1)
    }
}