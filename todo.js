let createBtn = document.getElementById('createBtn');
let inputTodo = document.getElementById('todo');
let toDoList = document.getElementById('todoList');
let darkMode = document.getElementById('switch');
let mainEl = document.getElementById('main');

inputTodo.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addToDo();
  }
});

function noTask() {
  if (toDoList.innerHTML == '') {
    let emptyTask = document.createElement('div');
    emptyTask.setAttribute('id', 'empty');
    emptyTask.textContent = 'Please Add A New Task';
    toDoList.appendChild(emptyTask);
  }
}

function removeNoTask() {
  if (document.getElementById('empty')) {
    document.getElementById('empty').remove();
  }
}

function addLoader() {
  if (createBtn.classList.contains('loader')) return;
  createBtn.classList.add('loader');
}

function removeLoader() {
  createBtn.classList.remove('loader');
}

darkMode.addEventListener('click', () => {
  if (darkMode.checked == true) {
    mainEl.classList.add('dark-mode');
  } else {
    mainEl.classList.remove('dark-mode');
  }
});

inputTodo.focus();
noTask();

function addToDo() {
  inputTodo.focus();
  let val = inputTodo.value;
  if (val == '') return;
  addLoader();
  let toDoItem = document.createElement('li');
  let toDoText = document.createElement('input');
  toDoText.type = 'text';
  toDoText.setAttribute('readonly', 'readonly');
  let btnContainer = document.createElement('div');
  btnContainer.classList.add('btn-container');
  let toDoEdit = document.createElement('button');
  let toDoDelete = document.createElement('button');
  let toDoFavorite = document.createElement('button'); // create favorite button
  toDoText.value = val;
  inputTodo.value = '';
  toDoEdit.innerHTML = `<i class="fas fa-edit"></i>`;
  toDoDelete.innerHTML = `<i class='fa fa-trash' aria-hidden='true'></i>`;
  toDoFavorite.innerHTML = `<i class='fa fa-star' aria-hidden='true'></i>`; // add star icon to favorite button
  toDoFavorite.classList.add('favorite-btn');

  // On hover
  toDoItem.addEventListener('mouseover', () => {
    toDoItem.appendChild(toDoFavorite);
  });
  

  
  toDoEdit.addEventListener('click', () => {
    toDoText.removeAttribute('readonly');
    toDoText.focus();
  });

  toDoDelete.addEventListener('click', () => {
    toDoItem.remove();
    noTask();
  });

  toDoFavorite.addEventListener('click', () => { // handle favorite button click event
    toDoItem.classList.add('favorite');
    
    toDoList.insertBefore(toDoItem, toDoList.firstChild); // move li element to top of list
    toDoFavorite.remove();
  });

  toDoText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      readOnly();
    }
  });

  function readOnly() {
    toDoText.setAttribute('readonly', 'readonly');
  }



  setTimeout(() => {
    toDoItem.appendChild(toDoText);
    btnContainer.appendChild(toDoDelete);
    btnContainer.appendChild(toDoFavorite);
    btnContainer.appendChild(toDoEdit);

    toDoItem.appendChild(btnContainer);
    toDoList.appendChild(toDoItem);
    removeNoTask();
    removeLoader();

    toDoFavorite.addEventListener('click', () => {
      toDoItem.classList.add('favorite');
      toDoList.insertBefore(toDoItem, toDoList.firstChild);
    });
  }, 800);
}
