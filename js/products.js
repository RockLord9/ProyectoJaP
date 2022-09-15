const ORDER_ASC_BY_COST = "P+";
const ORDER_DESC_BY_COST = "P-";
const ORDER_BY_PROD_REL = "Rel.";
let categoria = localStorage.getItem('catID');
let URL = "https://japceibal.github.io/emercado-api/cats_products/"+categoria+".json";
let currentProductsArray = [];
let minCount = undefined;
let maxCount = undefined;


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log(resultObj)
            currentProductsArray = resultObj.data.products
            showProductsList()
            
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
} );

function showProductsList(){

    let listaProducts = document.getElementById('product-list-container');

    let htmlContentToAppend = '';
    for (let product of currentProductsArray) {    
    
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){
            htmlContentToAppend += `
                <div class='list-group-item list-group-item-action cursor-active row-product' id='${product.id}'>
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
    }
    listaProducts.innerHTML = htmlContentToAppend;
 
    let rowProductos = document.querySelectorAll('.row-product');
    rowProductos.forEach(element => {
        element.addEventListener('click', (e) => {
            localStorage.setItem("idProducto", element.id);
            window.location = "product-info.html"
        })
    });
}


function sortAndShowProducts(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentProductsArray = categoriesArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_REL){
        result = array.sort(function(a, b) {
            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}