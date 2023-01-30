const mysql = require('mysql2/promise');

const creadentials = {
    host: 'localhost',
    user: 'root',
    database: 'store',
    password: '',
    connectionLimit: 10,
    waitForConnections: true,
    port: 3306
}
const conn = async ()=>{
    try {
        const pool = await  mysql.createPool(creadentials);
        return pool
        
    } catch (error) {
        console.log('----SOMETHING WRONG-----')
        console.log(error)
    }
}

conn();