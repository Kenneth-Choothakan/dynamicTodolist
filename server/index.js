import express from 'express'
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from './routes/auth.js'
import todoRouter from './routes/todolist.js'
const app = express()

// middleware

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    //res.header('Access-Control-Allow-Origin: *')
    next()
})
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/todolist', todoRouter)
// app.use('/', (req, res) => {
//     console.log('home route')
//     return res.send('hjvbhdfbvdf')
// })
app.listen(8800, () => console.log('Listening on port: 8800'))
