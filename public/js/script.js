if (window.location.pathname === "/") {
    console.log("works")
    const radioBtn = document.getElementsByClassName("task-radio")
    const taskParameter = document.getElementsByClassName("taskParameter")
    const taskMenu = document.getElementsByClassName("taskMenu");
    const taskParameterBtn = document.getElementsByClassName("taskParameter");
    
    // color the button according to the priority
    function setPriorityColor(priority) {
        console.log(priority.textContent)
        let color;
        switch (priority.textContent) {
            case 'low':
                priority.style.backgroundColor = "#2cc6ab";
                break;
            case 'medium':
                priority.style.backgroundColor = "#FF9B01";
                break;
            case 'high':
                priority.style.backgroundColor = "#EC4A9D";
                break;
            default:
                color = 'black'; // default color if priority is not recognized
        }
        return color;
    }
    
    // get all the elements with the class priority
    const priorityElement = document.getElementsByClassName('priority');
    for(let i = 0; i < priorityElement.length; i++) {
        const priority = priorityElement[i] ? priorityElement[i]: 'low';
        setPriorityColor(priority)
    }
    
    // display the dropdown menu when clicking on the status on mobile
    const classTasksStatus = document.getElementsByClassName("tasksStatus")
    const classDropdownTasks = document.getElementsByClassName("dropdownTasks")
    
    for(let i = 0; i < classTasksStatus.length; i++) {
        classTasksStatus[i].onclick = () => {
            classDropdownTasks[i].classList.toggle("dropDown")
        }
    }
    
    // Afficher le menu paramètre correspondant à la tâche sélectionnée
    for (let i = 0; i < radioBtn.length; i++) {
        radioBtn[i].onclick = () => {
            // Retirer la classe "toggle-parameter" de tous les éléments
            for (let j = 0; j < taskParameter.length; j++) {
                taskParameter[j].classList.remove("toggle-parameter");
                taskMenu[j].classList.remove("toggle-parameter");
            }
            // Ajouter la classe uniquement à l'élément correspondant
            taskParameter[i].classList.add("toggle-parameter");
        };
    }
    
    for (let i = 0; i < taskParameterBtn.length; i++) {
        taskParameterBtn[i].onclick = () => {
            // Check if the clicked menu is already open
            const taskMenuIsAlreadyOpen = taskMenu[i].classList.contains("toggle-parameter");
    
            // Close all menus
            for (let j = 0; j < taskMenu.length; j++) {
                taskMenu[j].classList.remove("toggle-parameter");
            }
    
            // If it was not already open, open it
            if (!taskMenuIsAlreadyOpen) {
                taskMenu[i].classList.add("toggle-parameter");
            }
        };
    }
} else {
    console.log("works")
    document.getElementById("editForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("dueDate").value;
        const priority = document.getElementById("priority").value;
        const status = document.getElementById("status").value;
        const id = document.getElementById("id").value
        const data = { title, description, dueDate, priority, status };
        console.log(data)
        const url = `http://localhost:3000/edit/${id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                console.log('Update successful:', response);
                window.location.replace('/');
            } else {
                console.error('Update failed:', response);
            }
        }).catch(error => console.error('Error:', error));
    });
}



