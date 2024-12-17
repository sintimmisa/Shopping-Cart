document.addEventListener("DOMContentLoaded", function() {
    // Get the cart table and cart data from localStorage
    const cartTable = document.querySelector("table");
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];

    // If the cart is empty, show a message
    if (cartData.length === 0) {
        cartTable.innerHTML = '<tr><td colspan="6">Your cart is empty.</td></tr>';
    } else {
        // Render cart products
        cartData.forEach(product => {
            renderCartProduct(product);
        });
        updateCartSummary();
    }

    // Function to render product data in the cart
    function renderCartProduct(product) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" width="50" /></td>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${product.quantity}" min="1" />
                <button class="btn btn-outline-primary">+</button>
                <button class="btn btn-outline-secondary">-</button>
            </td>
            <td>$${(product.price * product.quantity).toFixed(2)}</td>
            <td><button class="btn btn-danger">Remove</button></td>
        `;
        
        cartTable.querySelector("tbody").appendChild(row);
    }

    // Add event listeners for cart table actions (quantity adjustments, removal, etc.)
    cartTable.addEventListener("click", function(e) {
        if (e.target.matches(".btn-outline-secondary") || e.target.matches(".btn-outline-primary")) {
            let input = e.target.closest("td").querySelector("input");
            const row = e.target.closest("tr");
            const price = parseFloat(row.cells[2].textContent.replace("$", ""));
            const productId = cartData.find(product => product.name === row.cells[1].textContent).id;

            if (e.target.textContent === "+") {
                input.value = parseInt(input.value) + 1;
            } else if (e.target.textContent === "-" && input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }

            const quantity = parseInt(input.value);
            row.cells[4].textContent = `$${(price * quantity).toFixed(2)}`;

            // Update cartData with the new quantity
            updateCartProductQuantity(productId, quantity);
            updateCartSummary();
        }

        if (e.target.matches(".btn-danger")) {
            const row = e.target.closest("tr");
            const productId = cartData.find(product => product.name === row.cells[1].textContent).id;
            row.remove();

            // Remove product from cartData and update localStorage
            removeProductFromCart(productId);
            updateCartSummary();
        }
    });

    // Function to update the cart summary (subtotal and total)
    function updateCartSummary() {
        let subtotal = 0;

        document.querySelectorAll("table tbody tr").forEach(row => {
            const price = parseFloat(row.cells[2].textContent.replace("$", ""));
            const quantity = parseInt(row.querySelector("input").value);
            const total = price * quantity;
            row.cells[4].textContent = `$${total.toFixed(2)}`;
            subtotal += total;
        });

        document.querySelector(".cart-summary-subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector(".cart-summary-total").textContent = `$${subtotal.toFixed(2)}`;
    }

    // Function to update cartData and save to localStorage
    function updateCartProductQuantity(id, quantity) {
        const product = cartData.find(item => item.id === id);
        if (product) {
            product.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cartData));  // Update the cart in localStorage
        }
    }

    // Function to remove product from the cart
    function removeProductFromCart(id) {
        const productIndex = cartData.findIndex(item => item.id === id);
        if (productIndex !== -1) {
            cartData.splice(productIndex, 1);  // Remove the product from the cart array
            localStorage.setItem('cart', JSON.stringify(cartData));  // Update the cart in localStorage
        }
    }

    // Handle checkout button click
    const checkoutButton = document.querySelector("#checkout-button");
    if (checkoutButton) {
        checkoutButton.addEventListener("click", function() {
            if (cartData.length === 0) {
                showCartEmptyMessage();
            } else {
                showCheckoutSuccessMessage();

                // Clear the cart from localStorage
                localStorage.removeItem('cart');

                // Redirect to index.html after 3 seconds
                setTimeout(function() {
                    window.location.href = "index.html"; // Redirect to home page
                }, 3000);
            }
        });
    }

    // Function to show cart empty message
    function showCartEmptyMessage() {
        const messageContainer = document.getElementById("message-container");

        // Create an alert message for empty cart
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-warning', 'alert-dismissible', 'fade', 'show');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            <strong>Warning!</strong> Your cart is empty. Please add some items before proceeding to checkout.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Append the alert to the message container
        messageContainer.appendChild(alertDiv);
    }

    // Function to show success message after checkout
    function showCheckoutSuccessMessage() {
        const messageContainer = document.getElementById("message-container");

        // Create a success alert message
        const alertDiv = document.createElement('div');
        alertDiv.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = `
            <strong>Success!</strong> Your checkout was successful. You will be redirected to the homepage.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Append the alert to the message container
        messageContainer.appendChild(alertDiv);
    }
});
