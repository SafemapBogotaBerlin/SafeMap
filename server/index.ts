import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './router';

dotenv.config({path:'../.env'});

const port:number = parseInt(process.env.SERVER_PORT);
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at 0.0.0.0 on port ${port}`);
})
