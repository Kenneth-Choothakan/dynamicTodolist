import { db } from "../connect.js"

// create functions for create, update and delete todos 
export function createTodo(req,res) {
    console.log("create!!!!!")
    const {title, detail, user_id} = req.body
    console.log(title, detail, user_id)
    const insertQuery = 'INSERT INTO todolist_db.todos (title, details, user_id) VALUES (?,?,?)'
    db.query(insertQuery, [title, detail, user_id], (err,data) => {
        if(err) {
            console.log("Error occured here (line 9)")
            return res.status(500).send("Server error occurred", err)
        }
        if(data.length == 0) {
            // todo already exists
            return res.status(400).send('Todo already exists')
        }
        res.status(200).send("Todo created")
    })
}

export function getAllTodos(req,res) {
    console.log('REACHED: ', req.params.userId) // sdfs
    const user_id = req.params.userId
    const getTodosQuery = 'SELECT * FROM todolist_db.todos WHERE user_id=?'
    db.query(getTodosQuery, [user_id], (err, data) => {
        if(err) {
            console.log('Server')
            return res.status(500).send("Server error occurred")
        }
        if(data.length == 0) {
            console.log('no exist')
            return res.status(400).send("Todos don't exist")
        }
        res.status(200).send({message: 'Data Sent', data: data})
    })
}

export function removeTodo(req,res) {
    const todo_id = req.params.userId
    const removeTodoQuery = 'DELETE * FROM todolist_db.todos WHERE id=?'
    db.query(removeTodoQuery, [todo_id], (err,data) => {
        if(err) {
            return res.status(500).send("Server error occurred")
        }
        res.status(200).send("Todo deleted")
    })
}