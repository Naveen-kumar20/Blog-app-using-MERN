import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import backendRouter from './routes/routes.js';

const app = express();
await connectDB()
const PORT = process.env.PORT || 8080;

//middlware
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("Api is live");
})

app.use('/api', backendRouter)

app.listen(PORT, ()=>{
    console.log(`server running on : http://localhost:${PORT}`)
})