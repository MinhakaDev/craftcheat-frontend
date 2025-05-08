const cartBtn = document.querySelector('.cart-btn');
const closeBtn = document.querySelector('.close-btn');
const cartSidebar = document.querySelector('.cart-sidebar');
const cartOverlay = document.querySelector('.cart-overlay');
let cartSummaryHTML = document.querySelector('.cart-summary')

const iconCartQuantity = document.querySelector('.cart-count')
const listCartHTML = document.querySelector('.cart-items')
let cartItems = [];
let listProducts = [];

function cart()
{
    //opening and closing the sidebar when cart is clicked
    cartBtn.addEventListener('click', openCart)
    closeBtn.addEventListener('click', closeCart)
    cartOverlay.addEventListener('click', closeCart);
    
    listCartHTML.addEventListener('click', function (e) {
        if (e.target.classList.contains('remove-item')) {
            deleteProduct(e);
        }
    });
    
}

function openCart() {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Function to close cart
function closeCart() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function deleteProduct(event) {
    const button = event.target;
    const cartItem = button.closest('.cart-item');
    const itemId = cartItem.dataset.id;

    const itemIndex = cartItems.findIndex(item => item.item_id == itemId);

    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
        addCartToHtml();
        addCartToMemory();
    }
}


function addToCart(itemId)
{
    //find if item already in cart
    let itemInCart = cartItems.findIndex((value) => value.item_id == itemId);


    if(cartItems.length <= 0)
    {
        cartItems = [{item_id: itemId}]
    }else if(itemInCart < 0)
    {
        cartItems.push({
            item_id: itemId
        })
    }else{alert("Product already in cart");}
    addCartToHtml();
    addCartToMemory();
    
}




function addCartToMemory()
{
    localStorage.setItem('cart', JSON.stringify(cartItems))
}

function getCartFromMemory()
{
    if(localStorage.getItem('cart'))
    {
        {
            cartItems = JSON.parse(localStorage.getItem('cart'));
            addCartToHtml();
        }
    }
}
function addCartToHtml()
{
    listCartHTML.innerHTML = ``;
    totalQuantity = 0;
    totalPrice  = 0;
    totalDiscount = 0;
    if(cartItems.length > 0)
    {
        cartItems.forEach(cart => {
            totalQuantity += 1
            let newCart = document.createElement('div');
            newCart.classList.add('cart-item');
            newCart.dataset.id = cart.item_id;
            let itemPosition = listProducts.findIndex((value) => value.id == cart.item_id);
            let info = listProducts[itemPosition]
            totalPrice += info.price
            if(!info.discount)
            {
                newCart.innerHTML = `
                    <img src="${info.img}" alt="Valorant Pro Aimbot">
                    <div class="cart-item-info">
                        <h4>${info.name}</h4>
                        <div class="cart-item-meta">
                            <span class="item-subscription">${info.time} Month</span>
                        </div>
                    </div>
                    <div class="cart-item-price">$${info.price}</div>
                    <button class="remove-item">×</button>
                    `;
            }else
            {
                let discountPrice = (info.price*(100-info.discount_porcentage)/100).toFixed(2)
                totalDiscount += info.price - discountPrice
                newCart.innerHTML = `
                    <img src="${info.img}" alt="Valorant Pro Aimbot">
                    <div class="cart-item-info">
                        <h4>${info.name}</h4>
                        <div class="cart-item-meta">
                            <span class="item-subscription">${info.time}</span>
                            <span class="discount-badge">-${info.discount_porcentage}%</span>
                        </div>
                    </div>
                    <div class="cart-item-price">$${info.price}</div>
                    <button class="remove-item">×</button>
                    `;

            }
            listCartHTML.appendChild(newCart)
            cartSummaryHTML.innerHTML = 
            `
                <div class="summary-row">
                    <span>Subtotal</span>
                    <span>$${totalPrice.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Discount</span>
                    <span>-$${totalDiscount.toFixed(2)}</span>
                </div>
                <div class="summary-row total">
                    <span>Total</span>
                    <span>$${totalPrice-totalDiscount}</span>
                </div>
            `
        })
    }
        
    iconCartQuantity.textContent = totalQuantity
}

function checkEmptyCart() {
    const emptyCart = document.querySelector('.empty-cart');
    const cartSummary = document.querySelector('.cart-summary');
    const cartActions = document.querySelector('.cart-actions');
    const itemCount = document.querySelectorAll('.cart-item').length;
    console.log(itemCount)

    if (itemCount === 0) {
        emptyCart.style.display = 'flex';
        cartSummary.style.display = 'none';
        cartActions.style.display = 'none';
    } else {
        emptyCart.style.display = 'none';
        cartSummary.style.display = 'block';
        cartActions.style.display = 'flex';
    }
}


document.addEventListener("DOMContentLoaded", cart);
