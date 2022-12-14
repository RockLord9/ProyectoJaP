const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
let navBarUser = document.getElementById('nav-user');
navBarUser.innerHTML = localStorage.getItem('login');

if (localStorage.getItem("login") === null){
  window.location.href = "login.html";
}

navBarUser.addEventListener("click", function(){
  let htmlContentToAppend = `<ul>
  <li><a href="cart.html">Mi Carrito</a></li>
  <li><a href="my-profile.html">Mi Perfil</a></li>
  <li><a href="#" id="cerrar-sesion">Cerrar Sesion</a></li>
</ul>`
navBarUser.innerHTML += htmlContentToAppend

let cerrarSesion = document.getElementById("cerrar-sesion");

cerrarSesion.addEventListener("click", function(){
localStorage.clear();
window.location.href = "login.html"
})


});


