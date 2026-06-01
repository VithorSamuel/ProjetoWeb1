const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3307,
    user: 'root',
    password: '',
    database: 'ProjetoWeb1'
});
(async () => {
  try {
    // Tenta obter uma conexão do pool e executar um comando simples
    const connection = await pool.getConnection();
    console.log('Conexão com o MySQL realizada com sucesso!');
    
    // Libera a conexão de volta para o pool
    connection.release(); 
  } catch (erro) {
    console.error('Erro ao conectar ao banco de dados:');
    
    // Identificando os erros mais comuns:
    if (erro.code === 'ENOTFOUND') {
      console.error('-> O host (endereço) do banco de dados não foi encontrado.');
    } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('-> Usuário ou senha incorretos.');
    } else if (erro.code === 'ER_BAD_DB_ERROR') {
      console.error('-> O banco de dados especificado não existe.');
    } else {
      console.error('->', erro.message);
    }
  }
})();
module.exports = pool;