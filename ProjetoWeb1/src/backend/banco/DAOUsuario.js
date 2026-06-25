import { sql } from './bd.js';
import argon2 from 'argon2';

    async function ListarUsuario(email){
        const [Usuario] = await sql
        `select senha, email, idUsuario, nome from Usuario
        where email = ${email}`
        return Usuario
    }

    async function UsuarioInsert(nome, email, senhaHash){
        const [novoUsuario] = await sql `
        INSERT INTO Usuario (nome, email, senha) values
        (${nome}, ${email}, ${senhaHash})
        RETURNING idUsuario, nome, email
        `
        return novoUsuario
    }

    //export para os Controllers
export { UsuarioInsert };
export {ListarUsuario};