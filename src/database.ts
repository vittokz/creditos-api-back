import mysql from "promise-mysql";
import keys from "./keys";

const pool = mysql.createPool(keys.database);

pool.getConnection().then((connection) => {
  pool.releaseConnection(connection);
  console.log("DB CONNECT");
});

export default pool;

/* import keys from "./keys";
const mysql = require("mysql");

const conexion = mysql.createConnection({
  host: keys.database.host,
  user: keys.database.user,
  password: keys.database.password,
  database: keys.database.database,
}); 

conexion.connect((error: any) => {
  if (error) {
    console.log("El error de conexion es:" + error);
    return;
  }
  console.log("Conectado a mysql server");
});

export default conexion; */
