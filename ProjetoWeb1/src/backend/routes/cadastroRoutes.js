import {cadastro} from '../controller/cadastroController.js'
const cadastroFunc = {
    body: {
        type: 'object',
        required: ['nome', 'email', 'senha'],
        properties: {
            nome: { type: 'string'},
            email: { type: 'string', format: 'email' }, 
            senha: { type: 'string', minLength: 5 }
        }
    }
};

async function cadastroRoutes(fastify, options) {
    fastify.post('/cadastro', { schema: cadastroFunc }, cadastro);
}

export default cadastroRoutes   