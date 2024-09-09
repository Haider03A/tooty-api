import { createServer } from 'node:http';
import express from 'express'
import { Server } from 'socket.io';

import helmet from 'helmet'

import { connectDB } from "./db/config/db.js";

import { fileSocket } from './sockets/fileSocket.js'

const app = express()
const server = createServer(app);
const io = new Server(server);

const port = 3000

connectDB();

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('hello world')
})

fileSocket(io)

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})