import mysql from "mysql2/promise";

const connexion = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "DexAppBD",
    waitForConnections: true,
    connectionLimit: 10
});

export default connexion;