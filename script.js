var dt = new Date().toDateString()
document.getElementById("date-time").innerHTML = dt

window.addEventListener("load", () => {
  //todos is a task array in localStorage
  todos = JSON.parse(localStorage.getItem("todos")) || []

  const form = document.querySelector("form")

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const input = document.querySelector(".new-input")
    task = input.value

    todo = {
      content: task,
      done: false,
    }

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
    input.value = ""

    displayTodos()
  })

  displayTodos()
})

function displayTodos() {
  const list = document.querySelector(".list")
  list.innerHTML = ""
  todos.forEach((todo) => {
    //taskElem includes name of task and input, editBtn, deleteBtn
    const taskElem = document.createElement("div")
    taskElem.classList.add("task-elem")

    const taskName = document.createElement("div")

    //taskItem refers to taskName and taskInput
    const taskItem = document.createElement("div")
    taskItem.classList.add("task-item")

    //taskInput
    const taskInput = document.createElement("input")
    taskInput.classList.add("todo-input")
    taskInput.type = "text"
    taskInput.value = todo.content
    taskInput.setAttribute("readonly", "readonly")

    //taskCheck refers to checkbox
    const taskCheck = document.createElement("input") //checkbox
    taskCheck.classList.add("todo-check")
    taskCheck.type = "radio"
    taskCheck.checked = todo.done
    if (todo.done === true) {
      taskInput.style.textDecoration = "line-through"
      taskInput.style.color = "#ddddd3"
    }

    //create delete button
    const deleteBtn = document.createElement("button")
    const deleteIcon = document.createElement("i")
    deleteIcon.setAttribute("class", "uil uil-trash")
    deleteBtn.classList.add("delete-btn")
    deleteBtn.textContent = "delete"

    //create edit button
    const editBtn = document.createElement("button")
    const editIcon = document.createElement("i")
    editIcon.setAttribute("class", "uil uil-pen")
    // editBtn.classList.add("edit-btn")
    editBtn.textContent = "edit"

    //Append the created elements
    list.appendChild(taskElem)

    taskName.appendChild(taskItem)
    taskItem.appendChild(taskCheck) //checkbox
    taskItem.appendChild(taskInput)
    taskElem.appendChild(taskName)
    taskElem.appendChild(editIcon)
    taskElem.appendChild(deleteIcon)

    taskCheck.addEventListener("click", (e) => {
      if (taskInput.style.textDecoration === "line-through") {
        taskInput.style.textDecoration = "none"
        taskInput.style.color = "black"

        taskCheck.checked = false

        todo.done = false
      } else {
        taskInput.style.textDecoration = "line-through"
        taskInput.style.color = "#ddddd3"
        taskCheck.checked = true

        todo.done = true
      }

      localStorage.setItem("todos", JSON.stringify(todos))
    })

    editIcon.addEventListener("click", (e) => {
      if (taskInput.style.textDecoration === "none") {
        taskInput.removeAttribute("readonly")
        taskInput.focus()
        taskInput.addEventListener("blur", (e) => {
          taskInput.setAttribute("readonly", true)
          todo.content = e.target.value
          localStorage.setItem("todos", JSON.stringify(todos))
          displayTodos()
        })
      }
    })

    //delete button functionality
    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo)
      localStorage.setItem("todos", JSON.stringify(todos))
      displayTodos()
    })

    deleteIcon.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo)
      localStorage.setItem("todos", JSON.stringify(todos))
      displayTodos()
    })
  })
}
