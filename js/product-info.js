let categoria = localStorage.getItem('catID');
let idProducto = parseInt(localStorage.getItem('idProducto'));
let URLComentarios = "https://japceibal.github.io/emercado-api/products_comments/"+idProducto+".json"
let URL = "https://japceibal.github.io/emercado-api/products/"+idProducto+".json";
let producto = [];
let comentarios = [];
let productosRelacionados = [];
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            producto = resultObj
            productosRelacionados = resultObj.data.relatedProducts
            mostrarProducto();
            mostrarProductosRelacionados();
            console.log(producto);
            console.log(productosRelacionados);
            
        }
        
    });
    getJSONData(URLComentarios).then(function(resultObj){
        if (resultObj.status === "ok"){
            comentarios = resultObj
            console.log(comentarios);  
        }
        mostrarComentarios()
        
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
    let stars = ``
    for (let comentario of comentarios.data){
        for (let i = 0; i <  comentario.score ; i++ ){
            stars +=`<div>
            <span class="fa fa-star checked horizontal"></span> 
            </div>
            `;
        }
        htmlContentToAppend += `<br>
        <div>
            <p>Usuario: ${comentario.user}</p>
            <p>Descripcion; ${comentario.description} </p>
            <p>Score: ${stars}</p>          
        </div>`;
        stars = ``;
    }
    contenedorComentarios.innerHTML = htmlContentToAppend + stars;
}

function mostrarProductosRelacionados(){
    let contenedorProductosRelacionados = document.getElementById("productos-relacionados")
    contenedorProductosRelacionados.addEventListener("click", function(){
        localStorage.setItem("idProducto", productoRelacionado.id)
        window.location.href = "product-info.html"
    });

    let htmlContentToAppend = ``;
    for (let productoRelacionado of productosRelacionados){
        htmlContentToAppend += `<br>
        <div>
            <img src="${productoRelacionado.image}">
            <span>${productoRelacionado.name}</span>
        </div>`
        contenedorProductosRelacionados.addEventListener("click", function(){
            localStorage.setItem("idProducto", productoRelacionado.id)
            window.location.href = "product-info.html"
        }); 
   }
   contenedorProductosRelacionados.innerHTML = htmlContentToAppend;

}
//<p>Score: ${comentario.score} </p>
