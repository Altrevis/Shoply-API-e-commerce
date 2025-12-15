import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
const DB_NAME = process.env.DB_NAME || '';

console.log('Resolved DB config:');
console.log({ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD: DB_PASSWORD ? '<redacted>' : '<empty>', DB_NAME });

async function check() {
  let conn;
  try {
    conn = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASSWORD });
    console.log('Connected to MySQL server.');

    const [rows] = await conn.execute(
      'SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?',
      [DB_NAME]
    );

    if (rows.length > 0) {
      console.log(`Database '${DB_NAME}' exists.`);
    } else {
      console.log(`Database '${DB_NAME}' NOT found on server. Creating it now...`);
      try {
        await conn.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
        console.log(`Database '${DB_NAME}' created (or already existed).`);
      } catch (createErr) {
        console.error('Failed to create database:', createErr.message || createErr);
      }
    }
  } catch (err) {
    console.error('Error connecting to MySQL:', err.message || err);
  } finally {
    if (conn && conn.end) await conn.end();
  }
}

check();
