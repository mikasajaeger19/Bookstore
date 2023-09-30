import express, { response } from 'express';
import {PORT, MONGO_URI} from "./config.js"
import mongoose from 'mongoose';
import cors from 'cors'
import booksRoute from './routes/booksRoute.js'
const app = express();

app.use(express.json());
app.use(cors())
//or another way to use cors is
// app.use(
//     cors({
//         //whatever frontend url is
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type']
//     })
// )
app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello World!');
})

app.use('/books', booksRoute)

mongoose
    .connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
          })
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log(err)
    })
