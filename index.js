// http://localhost:3000/items


const searchInput = document.querySelector('#search');
const productsDom = document.querySelector('.product-center');
const btns = document.querySelectorAll('.btn');

let allProducts =[];
const filters = {
    searchItems : "",
};


document.addEventListener('DOMContentLoaded', ()=>{
    axios
    .get("http://localhost:3000/items")
    .then ((res) =>{
        allProducts =res.data;
        renderProducts(res.data,filters);
    })
    .catch((err)=>console.log(err))
});

function renderProducts(products,_filters){

    const filterProducts =products.filter((p)=>{
        return p.title.toLowerCase().includes(_filters.searchItems.toLowerCase());
    });
    productsDom.innerHTML = "";
    filterProducts.forEach((item) => {
        const productsDiv = document.createElement('div');
        productsDiv.classList.add ('product');
        productsDiv.innerHTML = `
        <div class="img-container">
            <img src=${item.image} alt="product-img">
        </div>
        <div class="product-desc">
            <p class="product-price"> ${item.price} $</p>
            <p class="product-title"> ${item.title}</p>
        </div> `;
        productsDom.appendChild(productsDiv);
    });

}


// filter search on search
searchInput.addEventListener('input', (e)=>{
    // console.log(e.target.value);
    filters.searchItems = e.target.value;
    renderProducts(allProducts,filters);
})


// filter search on categury

btns.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        const filter = e.target.dataset.filter;

        filters.searchItems = filter;
        renderProducts(allProducts,filters);
    });
});