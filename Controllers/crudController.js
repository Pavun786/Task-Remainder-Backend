const { ObjectId } = require("mongodb");
const {client} = require("../Connection/dbConnection")

const dotenv = require("dotenv")
dotenv.config()


const addTask = async(req,res)=>{
            try{
                const {taskName,status,email,deadline} = req.body;
                //Get correct date and time:
                const options = {
                    timeZone: 'Asia/Kolkata',
                    hour12: false, // If you want 24-hour format
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  };
                  
                  const date = new Date();
                  const indianDateTime = new Intl.DateTimeFormat('en-IN', options).format(date);
                  
                 const taskcreate = await client.db("task_completion").collection("tasks").insertOne({ taskName : taskName,status:status,email : email ,createdTime : indianDateTime, deadline : deadline})
                 res.status(200).send({message : "Task created sucessfully"}) 
            }catch(err){
                 res.status(400).send({message: err.message})
             }
}

const updateTask = async(req,res)=>{
     try{
        const {id} = req.params;
        const data = req.body
        const taskUpdate = await client.db("task_completion").collection("tasks").updateOne({_id:new ObjectId(id)},{$set:data})
        console.log("taskUpdate",taskUpdate)
        res.status(200).send({message : "Task updated successfully"}) 
    }
     catch(err){
        res.status(400).send(err.message)
     }
}

const getAllTasks = async(req,res)=>{
    try{
      const findAllTask = await client.db("task_completion").collection("tasks").find({}).toArray()
      res.status(200).send(findAllTask)
    }catch(err){
      res.status(400).send({message : err.message})
    }
}

const getAllTasksByEmail = async(req,res)=>{
      
      try{
          const {emailId} = req.params;  
          const getTasksByEmail = await client.db("task_completion").collection("tasks").find({ email : emailId }).toArray()
          res.status(200).send(getTasksByEmail)
        }catch(err){
          res.status(400).send({message : err.message})
         }
}

const getSingleTask = async(req,res)=>{
     try{
      const {id} = req.params;  
      const findSIngleTask = await client.db("task_completion").collection("tasks").findOne({_id : new ObjectId(id) })
      res.status(200).send(findSIngleTask)
    }catch(err){
      res.status(400).send({message : err.message})
     }
}



const deleteTask = async(req,res)=>{
     try{
        const {id} = req.params;
        const deleteTask = await client.db("task_completion").collection("tasks").deleteOne({_id : new ObjectId(id)})
        res.status(200).send({message : "Task deleted successfully"})
     }catch(err){
        res.status(400).send({message : err.message})
     }
}

module.exports = {addTask,updateTask,getAllTasks,getSingleTask,deleteTask,getAllTasksByEmail} 