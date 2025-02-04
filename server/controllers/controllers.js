const Tasks = require("../model/taskModel")
const List = require("../model/listModel")

exports.createList = async(req, res) => {
    const {title} = req.body;
    const list = new List({title});
    try {
        const newList = await list.save()
        res.redirect("/")
    } catch (error) {
        console.log("Error saving list: ", error)
        res.status(500).render("tasks/new", {
            list,
            errorMessageCreation: "Failed to crete an new list. Please try again",
        });
    }
}

// exports.findList = async (req, res, next) => {
//     try {

//         const lists = await List.find();
//         console.log(lists)
//         req.lists = lists; // Store in request object
//         next(); // Proceed to next middleware (taskController.findTasks)
//         // res.render("tasks/index", { lists: lists });
//     } catch (error) {
//         console.log("Error fetching lists: ", error);
//         res.status(500).json({ errorMessage: "Failed to fetch lists. Please try again." });
//     }
// }

exports.findList = async (req, res, next) => {
    try {
        const lists = await List.find();
        res.render("tasks/index", { lists: lists });
    } catch (error) {
        console.log("Error fetching lists: ", error);
        res.status(500).json({ errorMessage: "Failed to fetch lists. Please try again." });
    }
}

exports.tasksArea = async (req, res) => {
    try {

        const lists = await List.find();
        res.render("tasks/taskArea", { lists: lists });
    } catch (error) {
        console.log("Error fetching lists: ", error);
        res.status(500).json({ errorMessage: "Failed to fetch lists. Please try again." });
    }
}