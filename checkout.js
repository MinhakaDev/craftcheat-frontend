const checkoutListHTML = document.querySelector('.order-items')
const checkoutSummaryHTML = document.querySelector('.order-totals')


const initPage = () => {
    // Geting Data From Json
    fetch("products.json")
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        console.log(listProducts);
        getCartFromMemory();
        addCheckoutToHtml();
    })
    
}


function addcheckoutListToHTML()
{
    if(localStorage.getItem('cart'))
    {
        {
            cartItems = JSON.parse(localStorage.getItem('cart'));
            addCartToHtml();
        }
    }
}
function addCheckoutToHtml()
{
    checkoutListHTML.innerHTML = ``;
    totalQuantity = 0;
    totalPrice  = 0;
    totalDiscount = 0;
    if(cartItems.length > 0)
    {
        cartItems.forEach(cart => {
            totalQuantity += 1
            let newCart = document.createElement('div');
            newCart.classList.add('order-item');
            newCart.dataset.id = cart.item_id;
            let itemPosition = listProducts.findIndex((value) => value.id == cart.item_id);
            let info = listProducts[itemPosition]
            totalPrice += info.price
            if(!info.discount)
            {
                newCart.innerHTML = `
                            <div class="item-image">
                                <img src="${info.img}" alt="${info.imgalt}">
                            </div>
                            <div class="item-details">
                                <div class="item-name">${info.name}</div>
                                <span class="item-subscription">${info.time} Subscription</span>
                            </div>
                            <div class="item-price">$${info.price}</div>
                    `;
            }else
            {
                let discountPrice = (info.price*(100-info.discount_porcentage)/100).toFixed(2)
                totalDiscount += info.price - discountPrice
                newCart.innerHTML = `
                            <div class="item-image">
                                <img src="${info.img}" alt="${info.imgalt}">
                            </div>
                            <div class="item-details">
                                <div class="item-name">${info.name}</div>
                                <span class="item-subscription">${info.time} Subscription</span>
                                <span class="discount-badge">-${info.discount_porcentage}%</span>
                            </div>
                            <div class="item-price">$${info.price}</div>
                    `;

            }
            checkoutListHTML.appendChild(newCart)
            checkoutSummaryHTML.innerHTML = 
            `
                <div class="total-row">
                            <span>Subtotal</span>
                            <span>$${totalPrice.toFixed(2)}</span>
                        </div>
                        <div class="total-row">
                            <span>New User Discount</span>
                            <span>-$${totalDiscount.toFixed(2)}</span>
                        </div>
                        <div class="total-row final">
                            <span>Total</span>
                            <span class="final-price">$${totalPrice-totalDiscount}</span>
                        </div>
            `
        })
    }
        
    iconCartQuantity.textContent = totalQuantity
}


// JavaScript to handle payment method selection
document.addEventListener('DOMContentLoaded', function() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForms = {
        'credit-card': document.getElementById('credit-card-form'),
        'paypal': document.getElementById('paypal-form'),
        'crypto': document.getElementById('crypto-form')
    };
    
    // Set Credit Card as active by default
    document.querySelector('[data-payment="credit-card"]').classList.add('active');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Hide all payment forms
            Object.values(paymentForms).forEach(form => {
                form.style.display = 'none';
            });
            
            // Show selected payment form
            const selectedPayment = this.getAttribute('data-payment');
            paymentForms[selectedPayment].style.display = 'block';
        });
    });
});

initPage()