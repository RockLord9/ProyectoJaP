let user = document.getElementById('user');
    user.addEventListener('keypress', function(evento) {
        if (user.value.length < 5) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });

    let password = document.getElementById('pass');
    password.addEventListener('keypress', function(evento) {
        if (password.value.length < 8) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    });