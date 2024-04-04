require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const server = express();

// Import routes
const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/category");

//db connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DBConnector);
  console.log("database connected");
}

//middlewares
server.use(express.json());
server.use(express.urlencoded());
server.use(morgan("default"));

// Routes
server.use("/products", productRoutes);
server.use("/categories", categoryRoutes);

//instantiating the application
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log("server started");
});
