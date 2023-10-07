import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
//import {resolve} from 'path';
import router from './router';

//path not working - only .env from same folder
//const envPath = resolve(__dirname, '../.env');
//require('dotenv').config({ path: envPath});
//const result = dotenv.config()


//if (result.error) {
//  throw result.error
//}

dotenv.config();

const port:number = parseInt(process.env.SERVER_PORT);
const app = express();

app.use(cors());
app.use(router);
//app.use(express.json());
//router?



app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at 0.0.0.0 on port ${port}`);
})
