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
        // console.log(tasks[0].startDate)
        const monthOfTheYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const today = new Date().toISOString().split('T')[0]
        
        tasks.forEach(task => {
            const monthIndex = task.dueDate.getMonth();
            const dayNumber = task.dueDate.getDate();
            const updatedTask = { ...task.toObject() };

            if(today === task.dueDate.toISOString().split('T')[0]) {
                updatedTask.dueDate = "Today"
            } else {
                updatedTask.dueDate = `${monthOfTheYear[monthIndex]} ${dayNumber}`
            }

            if (updatedTask.status === "notStarted") {
                groupedTasks.notStarted.push(updatedTask);
            } else if (updatedTask.status === "inProgress") {
                groupedTasks.inProgress.push(updatedTask);
            } else if (updatedTask.status === "completed") {
                groupedTasks.completed.push(updatedTask);
            }
        });

        // console.log(groupedTasks)

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
    const {title, description, dueDate, priority, status } = req.body;
    const task = new Tasks({title, description, dueDate, priority, status });
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

exports.findOne  = async (req, res) => {
    const id = req.params.id;
    try {
        const task = await Tasks.findById(id);
        copieTask = {...task.toObject()}
        console.log(copieTask)
        copieTask.dueDate = copieTask.dueDate.toISOString().split('T')[0]
        res.render("tasks/edit", { task: copieTask });

    } catch(error) {
        console.log("Error fetching task: ", error);
        res.status(500).json({ errorMessage: "Failed to fetch task. Please try again." });
    }

}

exports.edit = async (req, res) => {
    const id = req.params.id;
    const {title, description, dueDate, priority, status } = req.body;
    try {
        const editTask = await Tasks.findByIdAndUpdate (id, {title, description, dueDate, priority, status }, {new: true});
        if (editTask) {
            res.status(200).json({ message: 'User updated successfully', user: editTask });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log("Error updating task: ", error);
        res.status(500).json({ errorMessage: "Failed to update task. Please try again." });
    }
}