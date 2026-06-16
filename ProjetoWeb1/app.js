import Fastify from 'fastify';
import path from 'path';
import { fileURLToPath } from 'url';
import formbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import multipart from '@fastify/multipart';
import cadastroRoutes from './src/backend/routes/cadastroRoutes.js';
import loginRoutes from './src/backend/routes/loginRoutes.js';
import virustotalRoutes from './src/backend/routes/virustotalRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({ logger: true });

fastify.register(formbody);
fastify.register(multipart);
fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'Public'),
    prefix: '/',
    wildcard: false,
    decorateReply: true
})

fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'views'),
    prefix: '/views/',
    decorateReply: false // Evita conflito com o primeiro decorateReply
});


fastify.register(cadastroRoutes);
fastify.register(loginRoutes);
fastify.register(virustotalRoutes);

fastify.get('/', async (request, reply) => {
    return reply.sendFile('index.html', path.join(__dirname, 'views'));
});

fastify.get('/login', async (request, reply) => {
    return reply.sendFile('login.html', path.join(__dirname, 'views'));
});

fastify.get('/cadastro', async (request, reply) => {
    return reply.sendFile('cadastro.html', path.join(__dirname, 'views'));
});

fastify.get('/main', async(request, reply) =>{
    return reply.sendFile('main.html', path.join(__dirname, 'views'))
})

fastify.get('/resultado', async(request, reply) =>{
    return reply.sendFile('resultado.html', path.join(__dirname, 'views'))
})
// Inicialização do Servidor
const start = async () => {
    try {
        await fastify.listen({ port: process.env.PORT || 3000,
            host: '0.0.0.0'
        });
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();