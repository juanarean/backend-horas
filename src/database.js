// conexion a la base de datos y querys

const mysql = require('mysql');
const { promisify } = require('util'); // con este modulo/metodo puedo manejar callbacks como promesas... para mayor comodidad del codigo

const { database } = require('./keys');

const pool = mysql.createPool(database); // supuestamente muy parecido a connection, Fazt dice que este cratePool tiene mejores opciones

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('La base de datos fue cerrada!');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.log("Demasiadas conexiones a la base de datos!");
        }
        if (err.code === 'ECONNREFUSED') {
            console.log("Conexion rechazada!");
        }
    }

    if (connection) {
        connection.release(); // con este metodo release comienza la conexion.
        console.log('Base de datos conectada');
    }
    return;
});

pool.query = promisify(pool.query); // cada vez que hago una query (metodo de pool) lo uso como una promesa.

module.exports = pool;