const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptylist = document.querySelector('#emptyList')

let tasks = []

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML =  `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${task.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
    

    tasksList.insertAdjacentHTML('beforeend', taskHTML)
})

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

function deleteTask(e) {
    if(e.target.dataset.action !== 'delete') {
        return
    }

    const parNod = e.target.closest('li')
    const id = Number(parNod.id)
    
    const index = tasks.findIndex(function(task) {
            return task.id === parNod.id
    })

    tasks.splice(index, 1)

    saveToLocalStorage()

    parNod.remove()

    

    if(tasksList.children.length == 1) {
        emptylist.classList.remove('none')
    }

}

function doneTask(e) {
    if(e.target.dataset.action !== 'done') {
       return
    }

    const parNod = e.target.closest('li')

    const id = Number(parNod.id)
    
    const task = tasks.find(function(task) {
        if (task.id === id){
            return true
        }

    })

    task.done = !task.done

    saveToLocalStorage()

    const taskTitle = parNod.querySelector('.task-title')


    taskTitle.classList.toggle('task-title--done')
}

function addTask(e) {
    e.preventDefault()
    
    const taskText = taskInput.value
    console.log(taskText)

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }

    tasks.push(newTask)

    saveToLocalStorage()

    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'

    const taskHTML =  `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                        <span class="${cssClass}">${newTask.text}</span>
                        <div class="task-item__buttons">
                            <button type="button" data-action="done" class="btn-action">
                                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                            </button>
                            <button type="button" data-action="delete" class="btn-action">
                                <img src="./img/cross.svg" alt="Done" width="18" height="18">
                            </button>
                        </div>
                    </li>`;
    

    tasksList.insertAdjacentHTML('beforeend', taskHTML)

    taskInput.value = ""
    taskInput.focus()
    

    if(tasksList.children.length > 1) {
        emptylist.classList.add('none')
    }
}



function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}