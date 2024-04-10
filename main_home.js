var todos = []

var doings = []

var completeds = []

var blocked = []

//hien thi new task ra man hinh
function render() {
    let items = todos.map(function (item, index) {
        return `
        <div class="task-container" style="display: block;" draggable = "true">
            <div class="task-content">
                <div class="task-header">
                    <div style="display: flex; justify-content: space-between;">
                        <p class="topic">${item.category}</p>
                        <div class="task-icon">
                            <img class="edit" onclick="onEdit(${index}, 'todos')" src="./icon/Edit.png" alt="">
                            <img class="delete" onclick="onDelete(${index}, 'todos')" src="./icon/Delete.png" alt="">
                        </div>
                    </div>
                    <p>${item.title}</p>
                </div>
                <div class="task">
                    <p>${item.content}</p>
                </div>
                <div class="task-time">
                    <i class="fa-regular fa-clock"></i>
                    <span>June 30, 2022</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemTodo.innerHTML = items.join('');
    console.log("123");

    let itemDoings = doings.map(function (item, index) {
        return `
        <div class="task-container" style="display: block;" draggable = "true">
            <div class="task-content">
                <div class="task-header">
                    <div style="display: flex; justify-content: space-between;">
                        <p class="topic">${item.category}</p>
                        <div class="task-icon">
                            <img class="edit" onclick="onEdit(${index}, 'doings')" src="./icon/Edit.png" alt="">
                            <img class="delete" onclick="onDelete(${index}, 'doings')" src="./icon/Delete.png" alt="">
                        </div>
                    </div>
                    <p>${item.title}</p>
                </div>
                <div class="task">
                    <p>${item.content}</p>
                </div>
                <div class="task-time">
                    <i class="fa-regular fa-clock"></i>
                    <span>June 30, 2022</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemDoing.innerHTML = itemDoings.join('');


    let itemCom = completeds.map(function (item, index) {
        return `
        <div class="task-container" style="display: block;" draggable = "true">
            <div class="task-content">
                <div class="task-header">
                    <div style="display: flex; justify-content: space-between;">
                        <p class="topic">${item.category}</p>
                        <div class="task-icon">
                            <img class="edit" onclick="onEdit(${index}, 'completeds')" src="./icon/Edit.png" alt="">
                            <img class="delete" onclick="onDelete(${index}, 'completeds')" src="./icon/Delete.png" alt="">
                        </div>
                    </div>
                    <p>${item.title}</p>
                </div>
                <div class="task">
                    <p>${item.content}</p>
                </div>
                <div class="task-time">
                    <i class="fa-regular fa-clock"></i>
                    <span>June 30, 2022</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemCompleted.innerHTML = itemCom.join('');


    let itemBlocked = blocked.map(function (item, index) {
        return `
        <div class="task-container" style="display: block;" draggable = "true">
            <div class="task-content">
                <div class="task-header">
                    <div style="display: flex; justify-content: space-between;">
                        <p class="topic">${item.category}</p>
                        <div class="task-icon">
                            <img class="edit" onclick="onEdit(${index}, 'blocked')" src="./icon/Edit.png" alt="">
                            <img class="delete" onclick="onDelete(${index}, 'blocked')" src="./icon/Delete.png" alt="">
                        </div>
                    </div>
                    <p>${item.title}</p>
                </div>
                <div class="task">
                    <p>${item.content}</p>
                </div>
                <div class="task-time">
                    <i class="fa-regular fa-clock"></i>
                    <span>June 30, 2022</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemBlocked.innerHTML = itemBlocked.join('');
}


var containerItemTodo = document.querySelector('.containerItemTodo');
var containerItemDoing = document.querySelector('.containerItemDoing');
var containerItemCompleted = document.querySelector('.containerItemCompleted');
var containerItemBlocked = document.querySelector('.containerItemBlocked');

//set todo array from local storage
if(localStorage.getItem('todos')){
    todos = JSON.parse(localStorage.getItem('todos'));
    let items = todos.map(render);
    containerItemTodo.innerHTML = items.join('');
    // count_todo.innerHTML = arr_todo.length;
}

if (localStorage.getItem('doings')) {
    doings = JSON.parse(localStorage.getItem('doings')) || [];
    let items = doings.map(render);
    containerItemDoing.innerHTML = items.join('');
}
if (localStorage.getItem('completeds')) {
    completeds = JSON.parse(localStorage.getItem('completeds')) || [];
    let items = completeds.map(render);
    containerItemCompleted.innerHTML = items.join('');
}
if (localStorage.getItem('blocked')) {
    blocked = JSON.parse(localStorage.getItem('blocked')) || [];
    let items = blocked.map(render);
    containerItemBlocked.innerHTML = items.join('');
}

//validate va luu new task vao local storage
var categoryInput = document.querySelector('.category-input');
var titleInput = document.querySelector('.title-input');
var contentInput = document.querySelector('.content-input');

var addsubmit = document.querySelector('.add-submit');
addsubmit.addEventListener('click', onCreate);

function onCreate() { 
    var todos = JSON.parse(localStorage.getItem('todos')) || [];
    let categoryValue = categoryInput.value;
    let titleValue = titleInput.value;
    let contentValue = contentInput.value;
    var check = true;
    if (categoryValue == '') {
        check = false;
        categoryInput.classList.add('error');
    }
    else categoryInput.classList.remove('error');
    if (titleValue == '') {
        check = false;
        titleInput.classList.add('error')
    }
    else titleInput.classList.remove('error');
    if (contentValue == '') {
        check = false;
        contentInput.classList.add('error')
    }
    else contentInput.classList.remove('error');
    if (check == true) {
        todos.push({
            category: categoryValue,
            title: titleValue,
            content: contentValue
        })
        localStorage.setItem('todos', JSON.stringify(todos));
        newContainer.classList.remove('active')
        render();
        location.reload(true);
    }
}

//hien thi man hinh nhap new task
var newTask = document.querySelector('.new-task');
var newContainer = document.querySelector('.new-container');
var newContent = document.querySelector('.new-content');

newTask.addEventListener('click', function () {
    newContainer.classList.toggle('active')
})

newContainer.addEventListener('click', function () {
    newContainer.classList.remove('active')
})

newContent.addEventListener('click', function (event) {
    event.stopPropagation()
})

//exit add
var exitadd = document.querySelector('.exitadd');

exitadd.addEventListener('click', function () {
    newContainer.classList.toggle('active', false);
})

// var editTask = document.querySelector('.edit');
// var editContainer = document.querySelector('.edit-container');
// var editContent = document.querySelector('.edit-content');
// editTask.addEventListener('click', function () {
//     editContainer.classList.toggle('active', true)
// })

//edit
var editContent = document.querySelector('.edit-content');
var editContainer = document.querySelector('.edit-container');

var categoryEdit = document.querySelector('.categoryEdit')
var titleEdit = document.querySelector('.titleEdit')
var contentEdit = document.querySelector('.contentEdit')
var checkbox = document.querySelectorAll('.checkBox-item');

var idd, typee;
var checkBoxTodo = document.querySelector('.checkBoxTodo')
var checkBoxDoing = document.querySelector('.checkBoxDoing')
var checkBoxCompleted = document.querySelector('.checkBoxCompleted')
var checkBoxBlocked = document.querySelector('.checkBoxBlocked')
function onEdit(id, type) {
    idd = id;
    typee = type;

    console.log(checkBoxTodo, checkBoxDoing, checkBoxBlocked, checkBoxCompleted)
    console.log(id, type)
    var array = window[type]
    categoryEdit.value = array[id].category;
    console.log(array[id].category)
    titleEdit.value = array[id].title;
    contentEdit.value = array[id].content;
    if (type == 'todos') checkBoxTodo.checked = true;
    else if (type == 'doings') {
        checkBoxDoing.checked = true;
    }
    else if (type == 'completeds') {
        checkBoxCompleted.checked = true;
    }
    else if (type == 'blocked') {
        checkBoxBlocked.checked = true;
    }

    editContainer.classList.toggle('active')
    //xuat hien ra man hinh
}

//mot checkbox duoc chon trong mot thoi diem
var allCheckbox = document.querySelectorAll('.ch');
console.log(allCheckbox)
allCheckbox.forEach(function (item) {
    item.addEventListener('change', function () {
        var temp = this;
        if (this.checked) {
            allCheckbox.forEach(function (item) {
                if (item !== temp) {
                    item.checked = false
                }
                // else itemm.checked = true;
            })
        }
    })
})

var submitEdit = document.querySelector('.edit-submit')

var checkSubmitEdit = false;

var checkBoxTemp = document.querySelector('.checkBoxTodo');

document.querySelectorAll('.ch').forEach(function (item) {
    item.addEventListener('click', function () {
        checkBoxTemp = item;
    })
})

submitEdit.addEventListener('click', function () {
    console.log('hello')
    checkSubmitEdit = true;
    console.log(idd, typee)
    var array = window[typee];
    array[idd].category = categoryEdit.value;
    array[idd].title = titleEdit.value;
    array[idd].content = contentEdit.value;
    var itemAdd = array[idd];
    console.log(itemAdd)
    array.splice(idd, 1);

    if (checkBoxTemp.parentNode.querySelector('.lable').textContent == 'Todo') {
        todos.push(itemAdd)
        localStorage.setItem('todos', JSON.stringify(todos));
        checkBoxTodo.checked = false;
        checkBoxDoing.checked = false;
        checkBoxCompleted.checked = false;
        checkBoxBlocked.checked = false;
        render()
    }

    if (checkBoxTemp.parentNode.querySelector('.lable').textContent == 'Doing') {
        doings.push(itemAdd)
        localStorage.setItem('doings', JSON.stringify(doings));
        checkBoxTodo.checked = false;
        checkBoxDoing.checked = false;
        checkBoxCompleted.checked = false;
        checkBoxBlocked.checked = false;
        render()
    }

    if (checkBoxTemp.parentNode.querySelector('.lable').textContent == 'Completed') {
        completeds.push(itemAdd)
        localStorage.setItem('completeds', JSON.stringify(completeds));
        checkBoxTodo.checked = false;
        checkBoxDoing.checked = false;
        checkBoxCompleted.checked = false;
        checkBoxBlocked.checked = false;
        render()
    }
    if (checkBoxTemp.parentNode.querySelector('.lable').textContent == 'Blocked') {
        blocked.push(itemAdd)
        localStorage.setItem('blocked', JSON.stringify(blocked));
        checkBoxTodo.checked = false;
        checkBoxDoing.checked = false;
        checkBoxCompleted.checked = false;
        checkBoxBlocked.checked = false;
        render()
    }

    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doings', JSON.stringify(doings));
    localStorage.setItem('completeds', JSON.stringify(completeds));
    localStorage.setItem('blocked', JSON.stringify(blocked));
  
    // localStorage.setItem(type, JSON.stringify(array)); 
    editContainer.classList.toggle('active')
    render();
})

var exit = document.querySelector('.exit');

exit.addEventListener('click', function () {
    editContainer.classList.toggle('active', false);
})

editContainer.addEventListener('click', function () {
    checkBoxTodo.checked = false;
    checkBoxDoing.checked = false;
    checkBoxCompleted.checked = false;
    checkBoxBlocked.checked = false;
    editContainer.classList.toggle('active')
})

editContent.addEventListener('click', function (event) {
    event.stopPropagation()
})

function onDelete(id, type) {
    var array = window[type];
    array.splice(id, 1);
    console.log('ne', array)
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doings', JSON.stringify(doings));
    localStorage.setItem('completeds', JSON.stringify(completeds));
    localStorage.setItem('blocked', JSON.stringify(blocked));
    render();
}

//lay du lieu tu local storage in ra man hinh ngay tu ban dau
render();

//drag drop

// const todos = document.querySelectorAll(".todo");
const taskContainer = document.querySelectorAll(".task-container");
// const all_status = document.querySelectorAll(".status");
const list = document.querySelectorAll(".list");
const containerItem = document.querySelectorAll(".containerItem");
let draggableTodo = null;

taskContainer.forEach((item) => {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
});

function dragStart() {
  draggableTodo = this;
  setTimeout(() => {
    this.style.display = "none";
  }, 0);
  console.log("dragStart");
}

function dragEnd() {
  draggableTodo = null;
  setTimeout(() => {
    this.style.display = "block";
  }, 0);
  console.log("dragEnd");
}

// list.forEach((list) => {
//   list.addEventListener("dragover", dragOver);
//   list.addEventListener("dragenter", dragEnter);
//   list.addEventListener("dragleave", dragLeave);
//   list.addEventListener("drop", dragDrop);
// });

containerItem.forEach((containerItem) => {
    containerItem.addEventListener("dragover", dragOver);
    containerItem.addEventListener("dragenter", dragEnter);
    containerItem.addEventListener("dragleave", dragLeave);
    containerItem.addEventListener("drop", dragDrop);
  });

function dragOver(e) {
  e.preventDefault();
  //   console.log("dragOver");
}

function dragEnter() {
  this.style.border = "1px dashed #ccc";
  console.log("dragEnter");
}

function dragLeave() {
  this.style.border = "none";
  console.log("dragLeave");
}

function dragDrop() {
  this.style.border = "none";
  this.appendChild(draggableTodo);
  console.log("dropped");
}
// render();