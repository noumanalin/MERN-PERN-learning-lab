import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config();

const { Pool } = pg;

// const { PG_USER, PG_PASSWORD, PG_DATABASE, PG_HOST, PG_PORT } = process.env;

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL database'))
    .catch((err) => {
        console.error('❌ Database connection error:', err);
        process.exit(1);
    });

pool.on('error', (err) => {
    console.error('❌ Unexpected DataBase Error:', err);
    process.exit(-1);
});

// Reusable query helper
export const query = (text, params) => pool.query(text, params);
// export const query = async (text, params) => {
//   try {
//     return await pool.query(text, params);
//   } catch (err) {
//     console.error('❌ Query error:', err);
//     throw err;
//   }
// };
 
export { pool };