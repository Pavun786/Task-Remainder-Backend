const express = require("express");

const {addTask,updateTask,getAllTasks,getSingleTask,deleteTask,getAllTasksByEmail} = require("../Controllers/crudController.js")

const auth = require("../middleware/authMiddleware.js")

const router = express.Router();

router.post("/createTask", addTask)
router.get("/allTask",getAllTasks)
router.get("/:id",getSingleTask)
router.get("/email/:emailId",getAllTasksByEmail)
 router.put("/:id",updateTask)
 router.delete("/:id",deleteTask)


module.exports = router

