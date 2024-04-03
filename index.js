require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const server = express();
const app = require('http').createServer(server);

//db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DBConnector);
  console.log('database connected')
}


//middlewares
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan('default'));


//routes

console.log('Huzefa here!!')

//instantiating the application
const port = process.env.PORT || 3000; 

app.listen(port, () => {
    console.log('server started');
  });