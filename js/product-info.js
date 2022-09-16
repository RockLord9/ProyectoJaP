let categoria = localStorage.getItem('catID');
let idProducto = parseInt(localStorage.getItem('idProducto'));
let URLComentarios = "https://japceibal.github.io/emercado-api/products_comments/"+idProducto+".json"
let URL = "https://japceibal.github.io/emercado-api/products/"+idProducto+".json";
let producto = [];
let comentarios = [];
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            producto = resultObj
            
            mostrarProducto()   
        }
        
    });
    getJSONData(URLComentarios).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj
            console.log(comentarios);  
        }
        
    });
   
});



function mostrarProducto(){

    let contenedorProductInfo = document.getElementById("contenedor-product-info");
    let htmlContentToAppend = '';
            console.log(producto) ; 
            htmlContentToAppend += `
            <div>
                <h1> Articulo: ${producto.data.name} </h1> <br> <br> 
                <p><b>Precio:</b> <br>${producto.data.cost} ${producto.data.currency} </p> <br> 
                <p><b>Descripcion:</b> <br>${producto.data.description} <br> 
                <p><b>Categoria:</b> <br>${producto.data.category} <br> 
                <p><b>Vendidos:</b> <br>${producto.data.soldCount} <br> 
                <img src = "${producto.data.images[0]}" > <br>
            </div>`
            contenedorProductInfo.innerHTML = htmlContentToAppend;    
            
}

function mostrarComentarios(){
    let contenedorComentarios = document.getElementById("comentarios");
    let htmlContentToAppend = ``;
        htmlContentToAppend += `<h1>PEPE</h1>`
        
    contenedorComentarios.innerHTML = htmlContentToAppend;

    }
    

