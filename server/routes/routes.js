const express = require("express")
const route = express.Router()
const services = require("../services/services")
const controllers = require("../controllers/controllers")


// route.get("/", controllers.find, controllers.findList)
route.get("/new", services.add)
// route.get("/", controllers.findList, (req, res) => {
//     // Once both controllers have populated req.lists and req.tasks, render the view
//     res.render("tasks/index", { 
//         lists: req.lists,   // Data from listController
//         // tasks: req.tasks    // Data from taskController
//     });
// });

route.get("/", controllers.findList)

route.get("/taskarea/:id", controllers.tasksArea)

route.post("/addList", controllers.createList)

module.exports = route
