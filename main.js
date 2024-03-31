// Lấy giá trị của một input
function getValue(id){
    return document.getElementById(id).value.trim();
}

// Hiển thị lỗi
function showError(key, mess){
    document.getElementById(key + '_error').innerHTML = mess;
}

function validate()
{
    var flag = true;

    //password
    var password = getValue('password');
    if (password == '' || password.length < 8){
        flag = false;
        showError('password', 'Vui lòng kiểm tra lại Password');
    }
    //email
    var email = getValue('username');
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!mailformat.test(email)){
        flag = false;
         
        showError('email', 'Vui lòng kiểm tra lại Email');
    }
     
    return flag;
}

function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // if (username === "" || password === "") {
    //     alert("Vui lòng nhập đủ tên người dùng và mật khẩu.");
    // }
    // else {
        // var loginArray = new Array();
        let loginArray = JSON.parse(localStorage.getItem('loginArray')) || [];
        const loginInfo = { username, password };

        var count = 0;
        for (var i = 0; i < loginArray.length; i++){
            if(username == loginArray[i].username && password == loginArray[i].password) count++;
        }

        if(count == 0) {
            // Thêm thông tin đăng nhập vào mảng
            loginArray.push(loginInfo);

            // Lưu mảng vào local storage
            localStorage.setItem('loginArray', JSON.stringify(loginArray));
            alert('Đăng kí thành công!');
            window.location.href = "index1.html";
        }
        else {
            alert('Tài khoản đã tồn tại');
            window.location.href = "index.html";
        // }
    }
}

// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("Register-button").addEventListener("click", register)
// });

function login() {
    const username0 = document.getElementById("username").value;
    const password0 = document.getElementById("password").value;
    if (username0 === "" || password0 === "") {
        alert("Vui lòng nhập đủ tên người dùng và mật khẩu.");
    }
    else {
        let storedData = JSON.parse(localStorage.getItem('loginArray'))
        
        var count = 0;
        for (var i = 0; i < storedData.length; i++){
            if(username0 == storedData[i].username && password0 == storedData[i].password) count++;
        }
    
        if (count) {
            alert('Đăng nhập thành công!');
            // redirectToNewPage();
            window.location.href = "logout.html"
        } else {
            alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Login-button").addEventListener("click", login)
});

function logout() {
    window.location.href = "index1.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Logout-button").addEventListener("click", logout)
});

function registerDisplay() {
    // const register = document.getElementById("Register-button");
    // const login = document.getElementById("Login-button");
    // register.style.display = "block";
    // login.style.display = "none";
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Register").addEventListener("click", registerDisplay)
});

function loginDisplay() {
    // const register = document.getElementById("Register-button");
    // const login = document.getElementById("Login-button");
    // register.style.display = "none";
    // login.style.display = "block";
    window.location.href = "index1.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Login").addEventListener("click", loginDisplay)
});