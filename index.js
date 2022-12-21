require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const client = require("./configs/db");
const authRouter = require("./routes/auth");
const blogRouter = require("./routes/blogs");
app.use(express.json());
app.use(cors());

app.use("/auth",authRouter);
app.use("/blogs",blogRouter);

const port = process.env.PORT || 8000

client.connect((err)=>{
    if (err) {
        console.log(err);
    }
    else{
        console.log("connected to database");
    }
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server running on port ${port}`);
    }
})