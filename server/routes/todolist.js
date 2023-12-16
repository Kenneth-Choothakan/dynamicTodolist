import express from 'express'
import {createTodo, getAllTodos, removeTodo} from '../controllers/todolist.js'
const router = express.Router()

router.post('/createTodo', createTodo)
router.get('/getTodos/:userId', getAllTodos)
router.post('/removeTodo/:userId', removeTodo)
export default router