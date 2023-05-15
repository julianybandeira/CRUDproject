import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "devuser",
    password: "password",
    database: "crud"
});