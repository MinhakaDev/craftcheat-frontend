// Simple demo script to toggle the cart
document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.querySelector('.cart-btn');
    const closeBtn = document.querySelector('.close-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartOverlay = document.querySelector('.cart-overlay');
    const removeButtons = document.querySelectorAll('.remove-item');

    // Function to open cart
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

    // Open cart when cart button is clicked
    cartBtn.addEventListener('click', openCart);

    // Close cart when close button is clicked
    closeBtn.addEventListener('click', closeCart);

    // Close cart when clicking on overlay
    cartOverlay.addEventListener('click', closeCart);

    // Remove item functionality (demo)
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cartItem = this.closest('.cart-item');
            cartItem.style.opacity = '0';
            setTimeout(() => {
                cartItem.remove();
                updateCartCount();
                updateCartSummary();
                checkEmptyCart();
            }, 300);
        });
    });

    // Function to update cart count
    function updateCartCount() {
        const itemCount = document.querySelectorAll('.cart-item').length;
        document.querySelector('.cart-count').textContent = itemCount;
        document.querySelector('.cart-header h3').textContent = `Your Cart (${itemCount})`;
    }

    // Function to check if cart is empty
    function checkEmptyCart() {
        const emptyCart = document.querySelector('.empty-cart');
        const cartSummary = document.querySelector('.cart-summary');
        const cartActions = document.querySelector('.cart-actions');
        const itemCount = document.querySelectorAll('.cart-item').length;

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

    // Function to update cart summary (demo)
    function updateCartSummary() {
        // In a real app, you would calculate the actual values
        const itemCount = document.querySelectorAll('.cart-item').length;
        if (itemCount === 2) {
            document.querySelector('.summary-row:first-child span:last-child').textContent = '$109.98';
            document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = '-$10.00';
            document.querySelector('.summary-row.total span:last-child').textContent = '$99.98';
        } else if (itemCount === 1) {
            document.querySelector('.summary-row:first-child span:last-child').textContent = '$49.99';
            document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = '-$5.00';
            document.querySelector('.summary-row.total span:last-child').textContent = '$44.99';
        } else if (itemCount === 0) {
            document.querySelector('.summary-row:first-child span:last-child').textContent = '$0.00';
            document.querySelector('.summary-row:nth-child(2) span:last-child').textContent = '-$0.00';
            document.querySelector('.summary-row.total span:last-child').textContent = '$0.00';
        }
    }
});