import colors from 'colors'
import server from './server'

const port = process.env.PORT || 4001

server.listen(port, () => {
    console.log(colors.green.bold(`Rest API desde el puerto ${port}`))
} )
