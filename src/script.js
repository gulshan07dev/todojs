// dark mode functionality
const themeModeBtn = document.querySelector("#theme-btn");
const themeBtn = document.querySelector("#theme-btn > i");

let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) || false;
const mainElement = document.querySelector("html");

function toggleDarkMode() {
    if (isDarkMode) {
        themeBtn.classList.replace("fa-moon", "fa-sun");
        mainElement.classList.add("dark");
    } else {
        themeBtn.classList.replace("fa-sun", "fa-moon");
        mainElement.classList.remove("dark");
    }
}

themeModeBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem("isDarkMode", isDarkMode);

    toggleDarkMode();
});

toggleDarkMode();



// todo functionality
const todoInput = document.querySelector("#todo-input");
const todoSubmitBtn = document.querySelector("#todo-submit");
const todosContainer = document.querySelector("#todos-container");

const todos = [];

todoSubmitBtn.addEventListener("click", () => {
    if (todoInput.value) {
        todos.push({
            id: todos.length + 1,
            todo: todoInput.value,
            isComplete: false
        });
        todoInput.value = "";
        renderTodo();
    }
});

function handleDeleteTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
        todos.splice(index, 1);
        renderTodo();
    }
}

function handleEditTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        const newTodoText = prompt("Edit todo:", todo.todo);
        if (newTodoText !== null) {
            todo.todo = newTodoText;
            renderTodo();
        }
    }
}

function renderTodo() {
    // Clear the todos container
    todosContainer.innerHTML = '';

    if (todos.length > 0) {
        todos.forEach((todo, idx) => {
            const todoElement = document.createElement("div");
            todoElement.classList.add("w-full", "bg-white", "dark:bg-[#18181b]", "border-[1px]", "border-gray-200", "dark:border-[#343638a2]", "p-3", "flex", "items-center", "justify-between", "gap-2", "group");

            todoElement.innerHTML = `
                <div class="flex gap-2">
                    <input type="checkbox" ${todo.isComplete ? 'checked' : ''}>
                    <p class=" text-gray-700 text-sm md:text-base dark:text-slate-100 line-clamp-2">
                        <span class="text-gray-600 dark:text-slate-200 text-base">${idx + 1}. </span>
                        ${todo.todo}
                    </p>
                </div>
                <div class="items-center hidden transition duration-100 group-hover:flex justify-center gap-3">
                    <button class="text-gray-700 dark:text-white" onclick="handleEditTodo(${todo.id})"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button class="text-[#ff0e0e]" onclick="handleDeleteTodo(${todo.id})"><i class="fa-solid fa-trash"></i></button>
                </div>`;

            // Append the todo element to the container
            todosContainer.appendChild(todoElement);
        });
    } else {
        // Display a message if there are no todos
        todosContainer.innerHTML = `<p class="text-gray-900 dark:text-white">No todos</p>`;
    }
}

renderTodo();


