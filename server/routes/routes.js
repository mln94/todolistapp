const express = require("express")
const route = express.Router()
const services = require("../services/services")
const controllers = require("../controllers/controllers")


route.get("/", controllers.find)
route.get("/new", services.add)


route.post("/createTask", controllers.create)
route.get("/edit/:id", controllers.findOne)

route.put("/edit/:id", controllers.edit)

module.exports = route
