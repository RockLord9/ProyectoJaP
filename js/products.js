let categoria = localStorage.getItem('catID');
let URL = "https://japceibal.github.io/emercado-api/cats_products/"+categoria+".json";

fetch(URL)
.then(function(respuesta) {
    console.log('dentro del then')
    return respuesta.json()
})
.then(function(respuesta) {
    productsArray = respuesta.products;
    let listaProducts = document.getElementById('product-list-container');

    let htmlContentToAppend = '';
    for (let product of productsArray) {
        console.log(product);
        htmlContentToAppend += `
            <div class='list-group-item list-group-item-action cursor-active'>
            <div class='row'>
                <div class='col-3'>
                    <img src='${product.image}' alt='${product.description}' class='img-thumbnail'>
                </div>
                <div class='col'>
                        <div class='d-flex w-100 justify-content-between'>
                            <h4 class='mb-1'>${product.name} - ${product.currency} ${product.cost}</h4>
                            <small class='text-muted'>${product.soldCount} artículos</small>
                        </div>
                        <p class='mb-1'>${product.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    listaProducts.innerHTML += htmlContentToAppend;
})



