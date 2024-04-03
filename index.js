import express from 'express'
import helmet from 'helmet'

import { connectDB } from "./db/config/db.js";

import filesRouter from './router/files.js'
import pagesRouter from './router/pages.js'
import itemsRouter from './router/items.js'

const app = express()
const port = 3000

connectDB();

app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/files', filesRouter)
app.use('/pages', pagesRouter)
app.use('/items', itemsRouter)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, ()=> {
    console.log(`Server running on http://localhost:${port}`);
})