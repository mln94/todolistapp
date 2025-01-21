const Tasks = require("../model/taskModel")

exports.find = async (req, res) => {
    try {
        const tasks = await Tasks.find();

        // Group tasks by their status
        const groupedTasks = {
            notStarted: [],
            inProgress: [],
            completed: []
        };
        // console.log(tasks)

        tasks.forEach(task => {
            if (task.status === "notStarted") {
                groupedTasks.notStarted.push(task);
            } else if (task.status === "inProgress") {
                groupedTasks.inProgress.push(task);
            } else if (task.status === "completed") {
                groupedTasks.completed.push(task);
            }
        });

        console.log(groupedTasks)

        res.render("tasks/index", {
            groupedTasks,
            confirmationMessage: "The task has been added"
        })
    } catch (error) {
        console.log("Error fetching tasks: ", error);
        res.status(500).json({ errorMessage: "Failed to fetch tasks. Please try again." });
    }
}

exports.create = async (req, res) => {
    const {title, description, startDate, dueDate, priority, status } = req.body;
    const task = new Tasks({title, description, startDate,dueDate, priority, status });
    try {
        const newTasks = await task.save()
        // Example usage
        // showAlert('This is a custom alert box!');
        res.redirect("/")
    } catch  (error) {
            console.log("Error saving task: ", error)
            res.status(500).render("tasks/new", {
                task,
                errorMessageCreation: "Failed to crete an new task. Please try again",
        });
    }
}