const inputList = document.getElementById("addList");
const lists = document.getElementById("baseAddList");

lists.addEventListener("keydown", (event) => {  // Use "keydown" instead of "keypress"
    if (event.key === "Enter" && inputList.value.trim() !== "") {  // Ensure input is not empty
        fetch("/addList", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: inputList.value }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Update successful:', response);
                window.location.replace('/');
            } else {
                console.error('Update failed:', response);
            }
        })
        .catch(error => console.error('Error:', error))
    }
});