const express = require('express');
const route = require("./server/routes/routes")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();
const port = 3000;

app.set("view engine","ejs")
app.set("views", __dirname + "/views")

app.use(express.json())
app.use(express.urlencoded({}))
app.use(express.static(__dirname + "/public"))

app.use("/", route)


//Database connection
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});