var todos = []

var doings = []

var completeds = []

var blocked = []

//hien thi new task ra man hinh
function render() {
    let items = todos.map(function (item, index) {
        return `
        <div class="task-container" id="${index}" style="display: block;" draggable = "true">
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
                    <span>${item.time}</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemTodo.innerHTML = items.join('');

    let itemDoings = doings.map(function (item, index) {
        return `
        <div class="task-container" id="${index}" style="display: block;" draggable = "true">
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
                    <span>${item.time}</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemDoing.innerHTML = itemDoings.join('');


    let itemCom = completeds.map(function (item, index) {
        return `
        <div class="task-container" id="${index}" style="display: block;" draggable = "true">
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
                    <span>${item.time}</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemCompleted.innerHTML = itemCom.join('');


    let itemBlocked = blocked.map(function (item, index) {
        return `
        <div class="task-container" id="${index}" style="display: block;" draggable = "true">
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
                    <span>${item.time}</span>
                </div>
            </div>
        </div>
        `
    })
    containerItemBlocked.innerHTML = itemBlocked.join('');
    showCount();
}

var containerItemTodo = document.querySelector('.containerItemTodo');
var containerItemDoing = document.querySelector('.containerItemDoing');
var containerItemCompleted = document.querySelector('.containerItemCompleted');
var containerItemBlocked = document.querySelector('.containerItemBlocked');

//Lấy các mảng được lưu trong localstorage hiển thị ra màn hình
if(localStorage.getItem('todos')){
    todos = JSON.parse(localStorage.getItem('todos'));
    let items = todos.map(render);
    containerItemTodo.innerHTML = items.join('');
    console.log(containerItemTodo);
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

//Lấy thời gian thực
function getCurrentTime(){
    let dt = new Date();
    let month = dt.toLocaleString('en-US', { month: 'long' });
    let day = dt.getDate();
    let year = dt.getFullYear();
    return `${month} ${day}, ${year}`;
}

//Đếm số task ở mỗi cột
function showCount(){
    let todoCount = document.querySelector(".todo-count")
    todoCount.innerHTML = todos.length
    let doingCount = document.querySelector(".doing-count")
    doingCount.innerHTML = doings.length
    let completedCount = document.querySelector(".completed-count")
    completedCount.innerHTML = completeds.length
    let blockedCount = document.querySelector(".blocked-count")
    blockedCount.innerHTML = blocked.length
}

//validate và lưu task mới vào local storage
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
            content: contentValue,
            time: getCurrentTime()
        })
        localStorage.setItem('todos', JSON.stringify(todos));
        newContainer.classList.remove('active')
        render();
        location.reload(true);
    }
    showCount();
    console.log(getCurrentTime());
}

//hien thi man hinh nhap new task
var newTask = document.querySelector('.new-task');
var newContainer = document.querySelector('.new-container');
var newContent = document.querySelector('.new-content');

newTask.addEventListener('click', function () {
    newContainer.classList.toggle('active')
})

newContainer.addEventListener('click', function () {
    categoryInput.value = "";
    titleInput.value = "";
    contentInput.value = "";
    categoryInput.classList.remove('error');
    titleInput.classList.remove('error');
    contentInput.classList.remove('error');
    newContainer.classList.remove('active');
})

newContent.addEventListener('click', function (event) {
    event.stopPropagation()
})

//exit add
var exitadd = document.querySelector('.exitadd');

exitadd.addEventListener('click', function () {
    categoryInput.value = "";
    titleInput.value = "";
    contentInput.value = "";
    categoryInput.classList.remove('error');
    titleInput.classList.remove('error');
    contentInput.classList.remove('error');
    newContainer.classList.toggle('active', false);
})

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


var checkBoxTemp = document.querySelector('.checkBoxTodo');

function onEdit(id, type) {
    categoryEdit.classList.remove('error');
    titleEdit.classList.remove('error');
    contentEdit.classList.remove('error');
    idd = id;
    typee = type;

    console.log(checkBoxTodo, checkBoxDoing, checkBoxBlocked, checkBoxCompleted)
    console.log(id, type)
    var array = window[type]
    categoryEdit.value = array[id].category;
    console.log(array[id].category)
    titleEdit.value = array[id].title;
    contentEdit.value = array[id].content;
    if (type == 'todos') {
        checkBoxTodo.checked = true;
        checkBoxTemp = checkBoxTodo
    }
    else if (type == 'doings') {
        checkBoxDoing.checked = true;
        checkBoxTemp = checkBoxDoing
    }
    else if (type == 'completeds') {
        checkBoxCompleted.checked = true;
        checkBoxTemp = checkBoxCompleted
    }
    else if (type == 'blocked') {
        checkBoxBlocked.checked = true;
        checkBoxTemp = checkBoxBlocked
    }

    editContainer.classList.toggle('active')
    //xuat hien ra man hinh
    showCount();
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

document.querySelectorAll('.ch').forEach(function (item) {
    item.addEventListener('click', function () {
        checkBoxTemp = item;
    })
})

submitEdit.addEventListener('click', function () {
    var check = true;
    if (categoryEdit.value == '') {
        check = false;
        categoryEdit.classList.add('error');
    }
    else categoryEdit.classList.remove('error');
    if (titleEdit.value == '') {
        check = false;
        titleEdit.classList.add('error')
    }
    else titleEdit.classList.remove('error');
    if (contentEdit.value == '') {
        check = false;
        contentEdit.classList.add('error');
    }
    else contentEdit.classList.remove('error');
    if (check == true) { 
        checkSubmitEdit = true;
        console.log(idd, typee)
        var array = window[typee];
        array[idd].category = categoryEdit.value;
        array[idd].title = titleEdit.value;
        array[idd].content = contentEdit.value;
        array[idd].time = getCurrentTime();
        var itemAdd = array[idd];
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
        location.reload(true);
    }  
})

//exit edit
var exit = document.querySelector('.exit');

exit.addEventListener('click', function () {
    checkBoxTodo.checked = false;
    checkBoxDoing.checked = false;
    checkBoxCompleted.checked = false;
    checkBoxBlocked.checked = false;
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

//xóa task
function onDelete(id, type) {
    var array = window[type];
    array.splice(id, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('doings', JSON.stringify(doings));
    localStorage.setItem('completeds', JSON.stringify(completeds));
    localStorage.setItem('blocked', JSON.stringify(blocked));
    render();
    showCount();
    location.reload(true);
}

//lay du lieu tu local storage in ra man hinh ngay tu ban dau
render();


//drag drop
const taskContainer = document.querySelectorAll(".task-container");
const list = document.querySelectorAll(".list");
const containerItem = document.querySelectorAll(".containerItem");
let draggableTodo = null;
var parent, idItem;

taskContainer.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
});

function dragStart() {
    draggableTodo = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
    parent = this.parentElement;
    idItem = this.id;
    console.log("dragStart");
}

function dragEnd() {
    draggableTodo = null;
    setTimeout(() => {
        this.style.display = "block";
    }, 0);
    let parentElement = this.parentElement;
    var task = parentElement.querySelectorAll('.task-container');
    
    //push vao mang moi
    //thay doi id
    let item;
    item = {
        category: this.querySelector(".topic").textContent,
        title: this.querySelector(".task-header>p").textContent,
        content: this.querySelector(".task p").textContent,
        time: this.querySelector(".task-time>span").textContent
    }
    if(parentElement.id == 1) {
        todos.push(item)
        let i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        localStorage.setItem('todos', JSON.stringify(todos));
        task.forEach(function(item) {
            item.id = i++;
        })
    }
    let i;
    if(parentElement.id == 2) {
        doings.push(item)
        i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task.forEach(function(item) {
            item.id = i;
            i++;
        })
        localStorage.setItem('doings', JSON.stringify(doings));
    }

    if(parentElement.id == 3) {
        completeds.push(item)
        i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task.forEach(function(item) {
            item.id = i++;
        })
        localStorage.setItem('completeds', JSON.stringify(completeds));
    }

    if(parentElement.id == 4) {
        blocked.push(item)
        i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task.forEach(function(item) {
            item.id = i++;
        })
        localStorage.setItem('blocked', JSON.stringify(blocked));
    }

    var task0 = parent.querySelectorAll('.task-container');
    //clear o mang cu
    if(parent.id == 1) {
        let arr = todos;
        arr.splice(idItem, 1);
        i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task0.forEach(function(item) {
            item.id = i++;
        })
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    if(parent.id == 2) {
        let arr = doings;
        arr.splice(idItem, 1);
        let i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task0.forEach(function(item) {
            item.id = i++;
        })
        localStorage.setItem('doings', JSON.stringify(doings));
    }

    if(parent.id == 3) {
        let arr = completeds;
        arr.splice(idItem, 1);
        let i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task0.forEach(function(item) {
            item.id = i++;
        })
        localStorage.setItem('completeds', JSON.stringify(completeds));
    }

    if(parent.id == 4) {
        let arr = blocked;
        arr.splice(idItem, 1);
        let i = 0;
        // Duyệt qua từng phần tử con và làm điều gì đó
        task0.forEach(function(item) {
            item.id = i++;
        })
        localStorage.setItem('blocked', JSON.stringify(blocked));
    }
    showCount();
    location.reload(true);
    console.log("dragEnd");
}

containerItem.forEach((containerItem) => {
    containerItem.addEventListener("dragover", dragOver);
    containerItem.addEventListener("dragenter", dragEnter);
    containerItem.addEventListener("dragleave", dragLeave);
    containerItem.addEventListener("drop", dragDrop);
});

function dragOver(e) {
  e.preventDefault();
    console.log("dragOver");
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


