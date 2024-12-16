document.addEventListener("DOMContentLoaded", function () {
    const cartTable = document.querySelector("table");
    
    cartTable.addEventListener("click", function (e) {
        if (e.target.matches(".btn-outline-secondary")) {
            let input = e.target.closest("td").querySelector("input");
            if (e.target.textContent === "+") {
                input.value = parseInt(input.value) + 1;
            } else if (e.target.textContent === "-" && input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
            updateCartSummary();
        }

        if (e.target.matches(".btn-danger")) {
            e.target.closest("tr").remove();
            updateCartSummary();
        }
    });

    function updateCartSummary() {
        let subtotal = 0;
        document.querySelectorAll("table tbody tr").forEach(row => {
            const price = parseFloat(row.cells[1].textContent.replace("$", ""));
            const quantity = parseInt(row.querySelector("input").value);
            const total = price * quantity;
            row.cells[3].textContent = `$${total.toFixed(2)}`;
            subtotal += total;
        });
        document.querySelector(".cart-summary-subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.querySelector(".cart-summary-total").textContent = `$${subtotal.toFixed(2)}`;
    }

    updateCartSummary();
});


// Function to handle the Checkout button
function handleCheckout() {
    // Fetch cart summary elements
    const subtotalElement = document.querySelector('.cart-summary-subtotal');
    const totalElement = document.querySelector('.cart-summary-total');

    // Get the subtotal and total amounts
    const subtotal = parseFloat(subtotalElement.textContent.replace('$', '')) || 0;
    const total = parseFloat(totalElement.textContent.replace('$', '')) || 0;

    // Validate if the cart is empty
    if (total === 0) {
        showBootstrapAlert('Your cart is empty. Please add items to your cart before checking out.', 'danger');
        return;
    }

    // Confirm checkout
    showBootstrapAlert(`Your total is $${total.toFixed(2)}. Redirecting to checkout...`, 'success');

    // Simulate a short delay before redirecting
    setTimeout(() => {
        window.location.href = './index.html'; //redirect to home page
    }, 2000);
}

// Utility function to show Bootstrap alerts
function showBootstrapAlert(message, type) {
    const alertPlaceholder = document.getElementById('alert-placeholder');

    // Create the alert element
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    // Append the alert to the placeholder
    alertPlaceholder.appendChild(alertDiv);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('hide');
        setTimeout(() => alertDiv.remove(), 300); // Remove the element from the DOM
    }, 3000);
}

// Attach event listener to the Checkout button
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.querySelector('.btn-primary.btn-lg');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', handleCheckout);
    }
});
