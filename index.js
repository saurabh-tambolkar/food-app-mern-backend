const express = require("express");
const app = express();
const PORT = 5000;
const cors = require('cors')

const connect_mongoDb = require('./db');
connect_mongoDb();


app.use(cors());

// const bodyParser = require("body-parser")
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

const Router = require('./Routes/CreateUser')
app.use('/api',Router);

const Router2 = require('./Routes/DisplayData')
app.use('/api',Router2);

const RouterOrder = require('./Routes/OrderData');
app.use("/api",RouterOrder);


app.get("/",(req,res)=>{
    res.send("<h1>hello world</h1>");
})

app.listen(PORT,()=>{
    console.log("server is listening to port no. "+PORT)
})