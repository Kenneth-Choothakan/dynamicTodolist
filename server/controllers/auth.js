import {db} from '../connect.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"

export function login(req,res) {
    console.log('RUNNING LOGIN')
    const {username} = req.body
    const query = 'SELECT * FROM users where username=?'

    db.query(query, [username], (err, data) => {
        if(err){
            return res.status(500).send("Server error occurred")
        }
        if(data.length === 0){
            // user does not exist
            return res.status(400).send('User not found')
        }
        // compare passwords before logging in
        let checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if (!checkPassword) {
            return res.status(404).send('Wrong password or username')
        }
        const token = jwt.sign({ id: data[0].id }, 'secretkey')
        const { password, ...otherData } = data[0]
        res.cookie("accessToken", token).status(200).json(otherData)
    })

}
export function register(req,res) {
    console.log('RUNNING!!!')

    const {full_name, username, password} = req.body
    const query = 'SELECT * FROM todolist_db.users where username=?'
    db.query(query, [username], (err, data) => {
    
        if(err) {
            return res.status(500).send("Server error occurred")
        }
        if(data.length !== 0) {
            // user is taken
            return res.status(400).send('User already exists')
        }
        
        // create  a new user with encrypted password
        const salt = bcrypt.genSaltSync(10)
        const encryptedPassword = bcrypt.hashSync(password, salt)
        // // Now insert into the user table in db
        const insertQuery = 'INSERT INTO todolist_db.users (full_name, username, password) VALUES (?, ?, ?)'
        db.query(insertQuery, ["full name tester", username, encryptedPassword], (err, data_2)=> {
            if(err){
               
                return res.send("Server error occurred when creating user")
            }
            console.log('Data: ', data_2)
            console.log('DATA FROM DB: ', data_2['insertId'])
            const token = jwt.sign({ id: data_2['insertId'], value: 'testing value'}, 'secretkey')
            // const { password, ...otherData } = data_2
            res.cookie("accessToken", token, {
                httpOnly: true
            }).status(200).json({userId: data_2['insertId']})
            //return res.send('User has been created:')
            //return res.send(`User created with ID: ${data_2['insertId']}`)
        })

    })

}
export function logout(req,res) {

}
