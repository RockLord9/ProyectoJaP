let formularioLogin = document.getElementById('my-form');
formularioLogin.addEventListener('submit', function(evento) {
  let loginEmail = document.getElementById('email').value;
  localStorage.setItem('login', loginEmail);
});
