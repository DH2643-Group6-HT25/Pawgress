import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

import indexRouter from './src/routes/index'
import usersRouter from './src/routes/users'
import affirmRouter from './src/routes/affirmation'
import streakRouter from './src/routes/streak'
import todoRouter from './src/routes/todo'
import journalRouter from './src/routes/journal'
import petRouter from './src/routes/pet'

import { connectDB } from './src/service/databseService'

const app = express()
const port = 3001


const corsCfg = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsCfg))
app.options('*', cors(corsCfg))              
app.use(cookieParser())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))


app.use((req, _res, next) => {
  console.log('REQ', req.method, req.path)
  next()
})

/* === Routes === */
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/affirmation', affirmRouter)
app.use('/streak', streakRouter)
app.use('/todo', todoRouter)                 // <— din todo-router
app.use('/journal', journalRouter)
app.use('/pet', petRouter)

/* Error handler */
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

/* DB & Socket */
connectDB()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: 'http://localhost:5173', credentials: true } })
io.on('connection', (socket) => {
  console.log('client connected:', socket.id)
  socket.emit('notification', { type: 'info', text: 'Connected' })
  socket.on('disconnect', (reason) => console.log('client disconnected:', socket.id, reason))
})

/* (frivillig) liten POST-probe för att testa efter preflight */
app.post('/_probe', (req, res) => res.json({ ok: true, body: req.body }))

server.listen(port, () => console.log(`Server + WS on http://localhost:${port}`))
