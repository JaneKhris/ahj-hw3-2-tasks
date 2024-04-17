import Task from './Task';

const taskArray = [];
let pinsArray = [];

const allTasks = document.querySelector('.all-container');
const pinnedTasks = document.querySelector('.pinned-container');

const input = document.getElementById('new-task');
const form = input.closest('form');

let noPinnedArray = [];
let pinnedArray = [];

function getArrays(text = '') {
  if (text) {
    noPinnedArray = taskArray.filter((task) => task.pinned === false)
      .filter((task) => task.name.startsWith(text));
  } else {
    noPinnedArray = taskArray.filter((task) => task.pinned === false);
  }
  pinnedArray = taskArray.filter((task) => task.pinned === true);
}

function listeners() {
  pinsArray.forEach((pin) => {
    pin.addEventListener('click', () => {
      const taskName = pin.closest('.task-container').querySelector('.task-title').textContent;
      taskArray.find((task) => task.name === taskName).pinChange();
      redraw();
    });
  });
}

function redraw(text = '') {
  allTasks.innerHTML = '';
  pinnedTasks.innerHTML = '';

  getArrays(text);

  if (noPinnedArray.length === 0) {
    allTasks.textContent = 'No tasks found';
  } else {
    noPinnedArray.forEach((task) => {
      const newTask = document.createElement('div');
      newTask.className = 'task-container';
      newTask.innerHTML = `
            <div class="task-title">${task.name}</div>
            <div class="task-pin"></div>
            `;
      allTasks.appendChild(newTask);
    });
  }

  if (pinnedArray.length === 0) {
    pinnedTasks.textContent = 'No pinned tasks';
  } else {
    pinnedArray.forEach((task) => {
      const newTask = document.createElement('div');
      newTask.className = 'task-container';
      newTask.innerHTML = `
            <div class="task-title">${task.name}</div>
            <div class="task-pin task-pin_checked"></div>
            `;
      pinnedTasks.appendChild(newTask);
    });
  }

  pinsArray = Array.from(document.querySelectorAll('.task-pin'));
  listeners();
}

redraw();

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

input.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    if (input.value.length === 0
      || input.value.trim().length === 0
      || taskArray.filter((task) => task.name === input.value).length > 0) {
      const error = document.createElement('div');
      error.className = 'error';
      error.innerHTML = `
            <div class="error-text">Error!</div>`;
      document.querySelector('body').appendChild(error);
      setTimeout(() => {
        error.remove();
      }, 2000);
      return null;
    }
    taskArray.push(new Task(input.value));
    input.value = '';
    redraw();
  }
  return null;
});

input.addEventListener('keyup', (event) => {
  if (!(event.code === 'Enter')) {
    if (input.value.length !== 0) {
      redraw(input.value);
    } else {
      redraw();
    }
  }
});
