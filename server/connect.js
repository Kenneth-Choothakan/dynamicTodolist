import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'jasonicken',
    database: 'todolist_db'
})