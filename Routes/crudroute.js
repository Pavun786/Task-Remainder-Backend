const express = require("express");

const {addTask,updateTask,getAllTasks,getSingleTask,deleteTask,getAllTasksByEmail} = require("../Controllers/crudController.js")

const auth = require("../middleware/authMiddleware.js")

const router = express.Router();

router.post("/createTask",auth,addTask)
router.get("/allTask",auth,getAllTasks)
router.get("/:id",auth,getSingleTask)
router.get("/email/:emailId",auth,getAllTasksByEmail)
 router.put("/:id",auth,updateTask)
 router.delete("/:id",auth,deleteTask)


module.exports = router

