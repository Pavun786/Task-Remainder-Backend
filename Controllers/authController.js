const bcrypt =require("bcrypt");
const jwt = require("jsonwebtoken")
const {client} = require("../Connection/dbConnection")
const dotenv = require("dotenv")
dotenv.config()


const userRegister = async(req,res)=>{
    const {userName,email,password} = req.body;
    // console.log(userName,email,password)
   
    if(!userName || !email || !password){
        res.status(401).send({message : "Please fill all credentials"})
    }
    const userFind = await client.db("task_completion").collection("users").findOne({email})

    if(userFind){
        res.status(401).send("The user already exists.so,please login")
    }else{
      
       if(password.length < 4){
         res.status(401).send("The password length should above 4 characters")
       }
       else{
          const NO_OF_ROUNDS =10
          const salt = await bcrypt.genSalt(NO_OF_ROUNDS)
          const hashedPassword = await bcrypt.hash(password,salt)
          
          const userCreate = await client.db("task_completion").collection("users").insertOne(
            {
                userName : userName,
                email : email,
                password : hashedPassword })
          
           res.status(200).send(userCreate)       

       } 
        
 }

}



const userLogin = async(req,res)=>{
     
    const {email,password} = req.body;

    if(!email || !password){
        res.status(401).send({message : "Please enter credentials"})
    }

    const userFind = await client.db("task_completion").collection("users").findOne({email : email})

    if(!userFind){
        res.status(401).send({message : "User not found"})
    }
    else{
      
        const comparePassword = await bcrypt.compare(password,userFind.password)

        if(!comparePassword){
            res.status(401).send({message : "Invalid credentials"})
        }else{
            const token = await jwt.sign({id : userFind._id},process.env.SECRET_KEY)
            res.status(200).send({message :"Logined successfully",token,email})
        }
    }

}

module.exports = {userRegister,userLogin}