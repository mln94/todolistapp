// function setPriorityColor(priority) {
//     console.log(priority.textContent)
//     let color;
//     switch (priority.textContent) {
//         case 'low':
//             priority.style.backgroundColor = "green";
//             break;
//         case 'medium':
//             priority.style.backgroundColor = "orange";
//             break;
//         case 'high':
//             priority.style.backgroundColor = "red";
//             break;
//         default:
//             color = 'black'; // default color if priority is not recognized
//     }
//     return color;
// }

// // Example usage:
// const priorityElement = document.getElementsByClassName('priority');
// for(let i = 0; i < priorityElement.length; i++) {
//     const priority = priorityElement[i] ? priorityElement[i]: 'low';
//     setPriorityColor(priority)
// }

const classTasksStatus = document.getElementsByClassName("tasksStatus")
const classDropdownTasks = document.getElementsByClassName("dropdownTasks")

for(let i = 0; i < classTasksStatus.length; i++) {
    classTasksStatus[i].onclick = () => {
        classDropdownTasks[i].classList.toggle("dropDown")
    }
}