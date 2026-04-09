// script.js - Shopping cart functionality

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get DOM elements
    const productsContainer = document.getElementById('productsContainer');
    const totalSpan = document.querySelector('.total');
    
    // Function to update total price based on current quantities
    function updateTotalPrice() {
        let total = 0;
        const productItems = document.querySelectorAll('.product-item');
        
        productItems.forEach(item => {
            // Only process items that are still in the DOM
            if (item && item.parentNode) {
                const price = parseFloat(item.getAttribute('data-price'));
                const quantitySpan = item.querySelector('.quantity');
                if (quantitySpan) {
                    const quantity = parseInt(quantitySpan.innerText) || 0;
                    total += price * quantity;
                }
            }
        });
        
        totalSpan.innerText = total + ' $';
        
        // Add a small animation to total price update
        totalSpan.style.transform = 'scale(1.1)';
        setTimeout(() => {
            totalSpan.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Function to adjust quantity (increment or decrement)
    function adjustQuantity(productElement, change) {
        const quantitySpan = productElement.querySelector('.quantity');
        let currentQuantity = parseInt(quantitySpan.innerText);
        let newQuantity = currentQuantity + change;
        
        // Ensure quantity never goes below 0
        if (newQuantity < 0) newQuantity = 0;
        
        quantitySpan.innerText = newQuantity;
        
        // Add animation to quantity change
        quantitySpan.style.transform = 'scale(1.2)';
        setTimeout(() => {
            quantitySpan.style.transform = 'scale(1)';
        }, 150);
        
        updateTotalPrice();
    }
    
    // Function to delete item from cart
    function deleteItem(productElement) {
        if (productElement && productElement.parentNode) {
            // Add fade-out effect before removal
            productElement.style.opacity = '0';
            
            setTimeout(() => {
                if (productElement.parentNode) {
                    productElement.remove();
                    updateTotalPrice();
                }
            }, 300);
        }
    }
    
    // Function to toggle like (heart color)
    function toggleLike(heartIcon) {
        // Toggle 'liked' class for styling
        if (heartIcon.classList.contains('liked')) {
            heartIcon.classList.remove('liked');
        } else {
            heartIcon.classList.add('liked');
        }
        
        // Add pop animation
        heartIcon.style.transform = 'scale(1.3)';
        setTimeout(() => {
            heartIcon.style.transform = 'scale(1)';
        }, 150);
    }
    
    // Event delegation: handle all dynamic events from the products container
    productsContainer.addEventListener('click', (event) => {
        const target = event.target;
        
        // Handle increment button (plus)
        if (target.classList.contains('fa-plus-circle') || target.classList.contains('increment-btn')) {
            const productItem = target.closest('.product-item');
            if (productItem) {
                adjustQuantity(productItem, 1);
            }
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Handle decrement button (minus)
        else if (target.classList.contains('fa-minus-circle') || target.classList.contains('decrement-btn')) {
            const productItem = target.closest('.product-item');
            if (productItem) {
                adjustQuantity(productItem, -1);
            }
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Handle delete button (trash)
        else if (target.classList.contains('fa-trash-alt') || target.classList.contains('delete-btn')) {
            const productItem = target.closest('.product-item');
            if (productItem) {
                deleteItem(productItem);
            }
            event.preventDefault();
            event.stopPropagation();
        }
        
        // Handle like button (heart)
        else if (target.classList.contains('fa-heart') || target.classList.contains('like-btn')) {
            toggleLike(target);
            event.preventDefault();
            event.stopPropagation();
        }
    });
    
    // Initialize all hearts with default color (not liked)
    const initializeHearts = () => {
        const allHearts = document.querySelectorAll('.fa-heart');
        allHearts.forEach(heart => {
            heart.classList.remove('liked');
        });
    };
    
    // Set initial total to 0
    updateTotalPrice();
    initializeHearts();
    
    // Optional: Add keyboard accessibility
    const allButtons = document.querySelectorAll('.increment-btn, .decrement-btn, .delete-btn, .like-btn');
    allButtons.forEach(button => {
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
        
        // Add keyboard support (Enter key)
        button.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });
    });
    
    // Handle image loading errors gracefully
    const images = document.querySelectorAll('.card-img-top');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/150?text=Product+Image';
        });
    });
    
    console.log('Shopping cart initialized successfully!');
});