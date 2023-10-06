
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const port = process.env.SERVER_PORT;
const app = express();

app.use(cors());
app.use(express.json());
//router?

app.get( "/", ( req, res ) => {
  res.send( "Hello world!" );
} );

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
})
