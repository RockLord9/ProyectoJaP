let user = document.getElementById('email');
let button = document.getElementById('button');
let password = document.getElementById('pass');


    user.addEventListener('keypress', function(evento) {
        if (user.value.length < 5) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });

    password.addEventListener('keypress', function(evento) {
        if (password.value.length < 8) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });

