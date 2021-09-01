"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = promise_mysql_1.default.createPool(keys_1.default.database);
pool.getConnection().then((connection) => {
    pool.releaseConnection(connection);
    console.log("DB CONNECT");
});
exports.default = pool;
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
