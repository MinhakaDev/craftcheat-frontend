/**
 * CraftCheat Website JavaScript
 * This script provides functionality for both the main homepage and the products page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initHeader();
    initCart();
    initProductActions();
    initAuth();
    initFilterControls();
    initSubscriptionOptions();
    initTabNavigation();
    initPagination();
});

/**
 * Header functionality
 */
function initHeader() {
    // Make header sticky on scroll
    let header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
        }
        
        lastScrollTop = scrollTop;
    });

    // Search bar functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('focus', function() {
            this.parentElement.classList.add('active');
        });
        
        searchInput.addEventListener('blur', function() {
            this.parentElement.classList.remove('active');
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                // Implement search functionality
                console.log('Searching for:', this.value);
                // Would normally redirect to search results page or filter current products
            }
        });
    }
}

/**
 * Shopping cart functionality
 */
function initCart() {
    // Cart variables
    let cartItems = [];
    let cartCount = 0;
    
    // Cart UI elements
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const cartCountElement = document.querySelector('.cart-count');
    const cartCloseBtn = document.querySelector('.cart-sidebar .close-btn');
    const continueShoppingBtn = document.querySelector('.cart-sidebar .secondary-btn');
    const checkoutBtn = document.querySelector('.cart-sidebar .primary-btn');
    
    // Open cart sidebar when cart button is clicked
    if (cartBtn) {
        cartBtn.addEventListener('click', function() {
            openCart();
        });
    }
    
    // Close cart when close button or continue shopping is clicked
    if (cartCloseBtn) {
        cartCloseBtn.addEventListener('click', closeCart);
    }
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', closeCart);
    }
    
    // Setup checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            console.log('Proceeding to checkout with items:', cartItems);
            // Redirect to checkout page (not implemented)
            alert('Redirecting to checkout...');
        });
    }
    
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.closest('.cart-item');
            removeFromCart(item);
        });
    });
    
    // Functions for cart operations
    function openCart() {
        if (cartSidebar) {
            cartSidebar.classList.add('open');
            document.body.classList.add('cart-open');
        }
    }
    
    function closeCart() {
        if (cartSidebar) {
            cartSidebar.classList.remove('open');
            document.body.classList.remove('cart-open');
        }
    }
    
    function addToCart(product) {
        // Add item to cart array
        cartItems.push(product);
        updateCartCount(1);
        
        // Show notification
        showNotification(`Added ${product.name} to cart!`);
        
        // Update cart UI
        updateCartUI();
    }
    
    function removeFromCart(itemElement) {
        const itemIndex = Array.from(itemElement.parentNode.children).indexOf(itemElement);
        
        if (itemIndex > -1 && itemIndex < cartItems.length) {
            const removedItem = cartItems.splice(itemIndex, 1)[0];
            updateCartCount(-1);
            
            // Remove the item from DOM
            itemElement.remove();
            
            // Update cart summary
            updateCartSummary();
            
            showNotification(`Removed ${removedItem.name || 'item'} from cart`);
        }
    }
    
    function updateCartCount(change) {
        cartCount += change;
        
        // Update the cart count in the UI
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            
            // Add pulse animation when count changes
            cartCountElement.classList.add('pulse');
            setTimeout(() => {
                cartCountElement.classList.remove('pulse');
            }, 300);
        }
    }
    
    function updateCartUI() {
        // This would normally update the cart items display
        // For this demo, we're just using the static HTML
        
        // Update cart summary totals
        updateCartSummary();
    }
    
    function updateCartSummary() {
        // Calculate totals
        const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
        const discount = calculateDiscount(subtotal);
        const total = subtotal - discount;
        
        // Update the summary in the UI
        const subtotalElement = document.querySelector('.summary-row:nth-child(1) span:last-child');
        const discountElement = document.querySelector('.summary-row:nth-child(2) span:last-child');
        const totalElement = document.querySelector('.summary-row.total span:last-child');
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (discountElement) discountElement.textContent = `-$${discount.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
    }
    
    function calculateDiscount(subtotal) {
        // Apply a 10% discount for orders over $100
        return subtotal > 100 ? subtotal * 0.1 : 0;
    }
    
    // Make functions available globally
    window.cartFunctions = {
        addToCart,
        removeFromCart,
        openCart,
        closeCart
    };
}

/**
 * Product-related actions
 */
function initProductActions() {
    // Add to cart buttons
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            // Extract product info
            const product = {
                name: productCard.querySelector('.product-title').textContent,
                game: productCard.querySelector('.product-game').textContent,
                price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', '')),
                subscription: '1 Month'  // Default
            };
            
            // Add animation to button
            this.classList.add('added');
            setTimeout(() => {
                this.classList.remove('added');
            }, 1000);
            
            // Add to cart
            window.cartFunctions.addToCart(product);
        });
    });
    
    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Make product cards clickable (navigate to detail page)
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on a button
            if (!e.target.closest('button')) {
                // In a real site, this would navigate to the product detail page
                console.log('View product:', this.querySelector('.product-title').textContent);
            }
        });
    });
}

/**
 * Authentication functionality
 */
function initAuth() {
    const loginBtn = document.querySelector('.login-btn');
    const authModal = document.querySelector('.auth-modal');
    const closeModalBtn = document.querySelector('.auth-modal .close-btn');
    const tabButtons = document.querySelectorAll('.auth-modal .tab-btn');
    const loginForm = document.querySelector('.login-form');
    
    // Open modal when login button is clicked
    if (loginBtn && authModal) {
        loginBtn.addEventListener('click', function() {
            authModal.classList.add('open');
            document.body.classList.add('modal-open');
        });
    }
    
    // Close modal when close button is clicked
    if (closeModalBtn && authModal) {
        closeModalBtn.addEventListener('click', function() {
            authModal.classList.remove('open');
            document.body.classList.remove('modal-open');
        });
    }
    
    // Close modal when clicking outside
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                authModal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    }
    
    // Tab switching
    if (tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                const tabPanes = document.querySelectorAll('.auth-modal .tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                
                // Get the index of the button and activate corresponding pane
                const index = Array.from(tabButtons).indexOf(this);
                if (tabPanes[index]) {
                    tabPanes[index].classList.add('active');
                }
            });
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('input[type="text"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // This would normally send an AJAX request to authenticate
            console.log('Login attempt:', { username, password });
            
            // Show success message
            showNotification('Login successful!');
            
            // Close modal
            if (authModal) {
                authModal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    }
}

/**
 * Filter controls for products page
 */
function initFilterControls() {
    const filterSelects = document.querySelectorAll('.filter-select');
    const filterBtn = document.querySelector('.filter-btn');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const removeTagBtns = document.querySelectorAll('.remove-tag');
    
    // Apply filters when button is clicked
    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            // Collect filter values
            const filters = {};
            filterSelects.forEach(select => {
                filters[select.previousElementSibling.textContent.replace(':', '')] = select.value;
            });
            
            console.log('Applying filters:', filters);
            // This would normally filter the products via AJAX or client-side filtering
            
            // For demo, just show notification
            showNotification('Filters applied!');
        });
    }
    
    // Clear all filters
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            // Reset all select inputs
            filterSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            // Remove all filter tags
            const filterTagsContainer = document.querySelector('.active-filters');
            const filterTags = filterTagsContainer.querySelectorAll('.filter-tag');
            
            filterTags.forEach(tag => tag.remove());
            
            // Show notification
            showNotification('All filters cleared');
        });
    }
    
    // Remove individual filter tags
    if (removeTagBtns) {
        removeTagBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove the parent tag
                this.parentElement.remove();
                showNotification('Filter removed');
            });
        });
    }
}

/**
 * Subscription options for product detail page
 */
function initSubscriptionOptions() {
    const subscriptionOptions = document.querySelectorAll('.subscription-option');
    
    if (subscriptionOptions.length) {
        subscriptionOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                subscriptionOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update product price
                const price = this.querySelector('.option-price').textContent;
                const productPriceElement = document.querySelector('.product-price-large');
                
                if (productPriceElement) {
                    productPriceElement.textContent = price;
                }
            });
        });
    }
}

/**
 * Tab navigation for product detail page
 */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.tab-buttons .tab-btn');
    const tabPanes = document.querySelectorAll('.tab-content .tab-pane');
    
    if (tabButtons.length && tabPanes.length) {
        tabButtons.forEach((button, index) => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                if (tabPanes[index]) {
                    tabPanes[index].classList.add('active');
                }
            });
        });
    }
}

/**
 * Pagination for products page
 */
function initPagination() {
    const pageButtons = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (pageButtons.length) {
        pageButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all page numbers
                pageButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // This would normally load the appropriate page of products
                console.log('Navigate to page:', this.textContent);
                
                // Scroll to top of products section
                const productsSection = document.querySelector('.products');
                if (productsSection) {
                    window.scrollTo({
                        top: productsSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Previous page button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            const prevPage = activePage.previousElementSibling;
            
            if (prevPage && prevPage.classList.contains('page-number')) {
                prevPage.click();
            }
        });
    }
    
    // Next page button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const activePage = document.querySelector('.page-number.active');
            const nextPage = activePage.nextElementSibling;
            
            if (nextPage && nextPage.classList.contains('page-number')) {
                nextPage.click();
            }
        });
    }
}

/**
 * Show a notification message
 */
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/**
 * Add some visual effects to elements
 */
function addVisualEffects() {
    // Add hover glow effect to the primary buttons
    const primaryButtons = document.querySelectorAll('.primary-btn');
    primaryButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x', `${x}px`);
            this.style.setProperty('--y', `${y}px`);
        });
    });
    
    // Add typing animation to the logo
    const logoElement = document.querySelector('.logo h1');
    if (logoElement) {
        const blinkElement = logoElement.querySelector('.blink');
        
        if (blinkElement) {
            setInterval(() => {
                blinkElement.classList.toggle('active');
            }, 500);
        }
    }
}

// Call visual effects function after DOM is loaded
document.addEventListener('DOMContentLoaded', addVisualEffects);

// Add CSS for notifications
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            background-color: #2ecc71;
            color: white;
            border-radius: 4px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification.error {
            background-color: #e74c3c;
        }
        
        .notification.warning {
            background-color: #f39c12;
        }
        
        .pulse {
            animation: pulse 0.3s ease-in-out;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        .buy-btn.added {
            background-color: #2ecc71;
            transform: scale(0.95);
        }
        
        /* Animation for cart sidebar */
        .cart-sidebar {
            position: fixed;
            top: 0;
            right: -400px;
            width: 380px;
            height: 100vh;
            background-color: white;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transition: right 0.3s ease;
            overflow-y: auto;
        }
        
        .cart-sidebar.open {
            right: 0;
        }
        
        /* Modal animation */
        .auth-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        
        .auth-modal.open {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            transform: translateY(20px);
            transition: transform 0.3s;
        }
        
        .auth-modal.open .modal-content {
            transform: translateY(0);
        }
        
        /* Sticky header */
        header.sticky {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: rgba(17, 17, 25, 0.95);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            z-index: 900;
            transition: transform 0.3s ease;
        }
        
        /* Primary button hover effect */
        .primary-btn {
            position: relative;
            overflow: hidden;
        }
        
        .primary-btn::after {
            content: '';
            position: absolute;
            width: 120px;
            height: 120px;
            top: var(--y, 50%);
            left: var(--x, 50%);
            transform: translate(-50%, -50%) scale(0);
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
            transition: transform 0.5s ease;
            pointer-events: none;
        }
        
        .primary-btn:hover::after {
            transform: translate(-50%, -50%) scale(1);
        }
        
        /* Blink animation for logo */
        .blink {
            display: inline-block;
            width: 2px;
            height: 20px;
            background-color: #4CAF50;
            margin-left: 5px;
            vertical-align: middle;
            opacity: 0;
        }
        
        .blink.active {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
})();