const todoList = document.querySelector('.todo-list');
const newTaskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('#add-task-btn');

// Load to-do list from local storage
let toDos = JSON.parse(localStorage.getItem('toDos')) || [];

// Render to-do list
function renderTodoList() {
  todoList.innerHTML = '';

  toDos.forEach((toDo) => {
    const todoListItem = document.createElement('li');
    todoListItem.classList.add('todo-list-item');

    const todoListItemCheckbox = document.createElement('input');
    todoListItemCheckbox.type = 'checkbox';
    todoListItemCheckbox.checked = toDo.completed;
    todoListItemCheckbox.addEventListener('change', () => {
      toDo.completed = !toDo.completed;
      localStorage.setItem('toDos', JSON.stringify(toDos));
      renderTodoList();
    });

    const todoListItemText = document.createElement('span');
    todoListItemText.textContent = toDo.text;

    const todoListItemDeleteIcon = document.createElement('i');
    todoListItemDeleteIcon.classList.add('fas', 'fa-trash');
    todoListItemDeleteIcon.addEventListener('click', () => {
      toDos = toDos.filter((t) => t !== toDo);
      localStorage.setItem('toDos', JSON.stringify(toDos));
      renderTodoList();
    });

    todoListItem.appendChild(todoListItemCheckbox);
    todoListItem.appendChild(todoListItemText);
    todoListItem.appendChild(todoListItemDeleteIcon);

    todoList.appendChild(todoListItem);
  });
};

// Add new to-do item
addTaskBtn.addEventListener('click', () => {
  const newTaskText = newTaskInput.value;
  if (newTaskText.length > 0) {
    const newToDo = {
      text: newTaskText,
      completed: false,
    };

    toDos.push(newToDo);
    localStorage.setItem('toDos', JSON.stringify(toDos));
    renderTodoList();

    newTaskInput.value = '';
  }
});

// Render to-do list on initial load
renderTodoList();
