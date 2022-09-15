let categoria = localStorage.getItem('catID');
let URL = "https://japceibal.github.io/emercado-api/cats_products/"+categoria+".json";
let idProducto = parseInt(localStorage.getItem('idProducto'));
let currentProductsArray = [];

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data.products;
                     
            mostrarProducto()   
        }
        
    });
   
});

function mostrarProducto(){

    for (producto of currentProductsArray){
        if (producto.id == idProducto){
        
        }
    }
}
