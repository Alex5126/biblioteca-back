import { createPool } from 'mysql2/promise';

export async function connect(){
    const connection = await createPool({
        database:'library',
        host:'127.0.0.1',
        port:3306,
        user:'admin',
        password:'qwepoi123098',
        connectionLimit:10
    });

    return connection;
}