let completedCount = 0;


document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "admin" && password === "12345") {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("mainPage").style.display = "block";
    } else {
        alert("Invalid username or password");
    }
});


document.getElementById("logoutLink").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginPage").style.display = "block";
    document.getElementById("mainPage").style.display = "none";
});


document.getElementById("todoListLink").addEventListener("click", function(event) {
    event.preventDefault();
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(data => {
            const todoList = document.getElementById("todoList");
            todoList.innerHTML = ''; 
            completedCount = 0;
            const promises = data.map(item => {
                return new Promise(resolve => {
                    const todoItem = document.createElement("div");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = item.completed;
                    checkbox.addEventListener("change", function() {
                        if (this.checked) {
                            completedCount++;
                            if (completedCount === 5) {
                                alert(`Congrats. ${completedCount} Tasks have been Successfully Completed`);
                            }
                        } else {
                            completedCount--;
                        }
                    });
                    todoItem.appendChild(checkbox);
                    const title = document.createElement("span");
                    title.textContent = item.title;
                    todoItem.appendChild(title);
                    todoList.appendChild(todoItem);
                    resolve(item.completed);
                });
            });

            
            Promise.all(promises)
                .then(completed => {
                    const completedTasks = completed.filter(task => task).length;
                    if (completedTasks === 5) {
                        alert(`Congrats. ${completedTasks} Tasks have been Successfully Completed`);
                    }
                });
        })
        .catch(error => {
            console.error("Error fetching Todo List:", error);
        });
});