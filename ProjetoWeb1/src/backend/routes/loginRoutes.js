import {login} from '../controller/loginController.js'

    const loginfunc = {
        body:{
            type: 'object',
            required:['senha', 'email'],
            properties: {
                email: {type: 'string', format: 'email'},
                senha: {type: 'string'}
            }
        }
    }

async function loginRoutes(fastify) {
    fastify.post('/login', {schema: loginfunc}, login)
}


export default loginRoutes