import 'dotenv/config';
import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
    throw new Error("A variável DATABASE_URL não foi encontrada no arquivo .env");
}

// Cria e exporta a conexão única com a Neon
export const sql = postgres(process.env.DATABASE_URL.trim(), { ssl: 'require' });

