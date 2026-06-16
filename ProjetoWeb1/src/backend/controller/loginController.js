import {ListarUsuario} from '../banco/DAOUsuario.js'
import argon2 from 'argon2'

const login = async (request, reply) =>{
    const {senha, email} = request.body


    try{
        
        const usuario = await ListarUsuario(email)

        if(!usuario){
            return reply.code(401).send({mensagem: 'senha ou email errados'})
        }
        
        const senhaHash = await argon2.verify(usuario.senha, senha)

        if(!senhaHash){
            return reply.code(401).send({mensagem: "Senha ou email errados"})
        }

        return reply.code(200).send({
            mensagem: "login realizado com sucesso",
            usuario: usuario
        })

    }catch(err){
        request.log.error(err)
        return reply.code(500).send({mensagem: "Erro interno do servidor"});
    }
}

export {login}