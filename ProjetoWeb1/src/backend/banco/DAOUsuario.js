import { sql } from './bd.js'; // Ajuste o caminho se necessário para achar o bd.js
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
// Se seu projeto usa ES Modules (import/export), use: export { cadastro };
// Se usa CommonJS, mantenha:
export { UsuarioInsert };
export {ListarUsuario};