const {MongoClient} = require("mongodb")
const dotenv = require("dotenv")
dotenv.config()

const MONGO_URI = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URI)

const dbConnection = async()=>{
    try{
     
     await client.connect()
     console.log("The DB connected ")
 
    }
    catch(err){
      console.log(err)
    }
 }

 module.exports = {client,dbConnection}