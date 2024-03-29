const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer")
const cron = require("node-cron")

const user = require("./Routes/authroute.js")
const main = require("./Routes/crudroute.js")
const {dbConnection} = require("./Connection/dbConnection.js")
const remainderMailSend = require("./Mailsend/remainderMail.js")
const Mail = require("./Mailsend/Mail.js")

const app = express();

app.use(express.json())
app.use(cors("*"))
dotenv.config()

const port = process.env.PORT || 4000 ;


dbConnection();

app.use("/auth",user)
 app.use("/task",main)

//runclear 

app.get("/",(req,res)=>{
    res.send("Welcome to the Task Remainder project")
})

 remainderMailSend();
//Mail();


app.listen(port,()=>{
    console.log(`The server start to run on port ${port}`)
})

