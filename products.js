

let listProductsHTML = document.querySelector('.products-grid')
let listCartHTML = document.querySelector('cart-items')
let listProducts = [];
let cartItems = [];


function addDataToScreen()
{
    listProductsHTML.innerHTML = '';
    if(listProducts.length > 0)
    {
        listProducts.forEach(item =>{
            let newItem = document.createElement('div');
            newItem.classList.add('product-card');
            newItem.dataset.id = item.id;
            let name = item.name;
            let price = item.price;
            let img = item.img;
            let badge = item.badge;
            let features = item.features;
            let game = item.game;
            newItem.innerHTML = `<div class="product-image">
                        <img src=${img} alt=${item.imgalt}>
                        <div class="product-badge">${badge}</div>
                    </div>
                    <div class="product-content">
                        <div class="product-game">${game}</div>
                        <h4 class="product-title">${name}</h4>
                        <div class="product-features">
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span>${features[0]}</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span>${features[1]}</span>
                            </div>
                            <div class="feature-item">
                                <span class="feature-icon">✓</span>
                                <span>${features[2]}</span>
                            </div>
                        </div>
                        <div class="product-actions">
                            <div class="product-price">$${price}</div>
                            <button class="buy-btn">Add to Cart</button>
                        </div>
                    </div>`;
                    listProductsHTML.appendChild(newItem);
        })
    }
}

listProductsHTML.addEventListener('click', (event)=>{
    let positionClick = event.target;
    if (positionClick.classList.contains('buy-btn')) {
        let itemId = positionClick.closest('.product-card')?.dataset.id;
        alert(itemId)
    }
})
function addToCart()
{

}
const initPage = () => {
    // Geting Data From Json
    fetch("products.json")
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        console.log(listProducts);
        addDataToScreen()
    })
}

initPage();