import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors'
import contactRoute from './routes/contact.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()
const port = 4000
app.use(express.json({ limit: '50mb' }))

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use('/', contactRoute)


app.listen(port, () => console.log(`listening on port ${port}!`))
connectDB()