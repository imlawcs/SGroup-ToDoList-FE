var p1 = document.querySelector('.email_error');
var p2 = document.querySelector('.password_error');

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let count = 0;
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!mailformat.test(username) || username == ""){
        p1.innerText = 'Please check your username'
        p1.classList.add('active')
        count++;
    }
    else p1.classList.remove('active');
    if (password == ""){
        p2.innerText = 'Please enter your password'
        p2.classList.add('active')
        count++;
    }
    else p2.classList.remove('active');
    
        if (count == 0) {
            fetch('https://recruitment-api.pyt1.stg.jmr.pl/login', {
                method: 'POST', //GET
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    login: username,
                    password: password
                })
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Chuyển đổi phản hồi JSON thành đối tượng JavaScript
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    // Xử lý phản hồi thành công
                    if (data.status === 'ok') {
                        window.location.href = 'home.html';
                    } else {
                        p2.innerText = 'Your account and password are invalid'
                        p2.classList.add('active')  
                    }
                })
                .catch(error => {
                    // Xử lý lỗi từ máy chủ
                    console.error('Error:', error);
                });
        }
    }

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Login-button").addEventListener("click", login)
});

function loginDisplay() {
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("Login").addEventListener("click", loginDisplay)
});