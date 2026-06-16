import { UsuarioInsert } from "../banco/DAOUsuario.js";
import argon2 from 'argon2'
//handler
const cadastro = async (request, reply) =>{
    const {nome, email, senha} = request.body;
    console.log(`Controller = cadastrando ${email}`)

    try{
        const senhaHash = await argon2.hash(senha,{
            type: argon2.argon2id
        })

        const novoUsuario = await UsuarioInsert(nome, email, senhaHash)

        return reply.code(201).send({
            mensagem: "Usuario cadastrado com sucesso",
            usuario: novoUsuario
        })

    }catch(err){
        request.log.error(err);

        if(err.code === "23505"){
            return reply.code(400).send({error: "e-mail ja cadastrado"})
        }else{
            return reply.code(500).send({error: 'Erro interno do servidor'})
        }
    }
}

export {cadastro}