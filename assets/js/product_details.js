document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  // Fetch product data (from local JSON or API)
  fetch('../../data/products.json')
      .then(response => response.json())
      .then(data => {
          // Find the product with the matching ID
          const product = data.find(p => p.id === productId);

          if (product) {
              // Populate the product details
              document.querySelector('.product_details h2').innerText = product.name;
              document.querySelector('.product_details .text-muted').innerText = `Category: ${product.category}`;
              document.querySelector('.product_details .lead').innerText = `$${product.price}`;
              document.querySelector('.product_details p.mt-3').innerText = product.description || 'No description available';
              document.querySelector('.product_details img').src = product.image.thumbnail;

              // Handle the "Add to Cart" button
              const addToCartButton = document.querySelector('.btn-primary');
              addToCartButton.addEventListener('click', () => {
                  addToCart(product);
              });

              // Handle "Buy Now" button (optional)
              const buyNowButton = document.querySelector('.btn-secondary');
              buyNowButton.addEventListener('click', () => {
                  //addToCart(product); // Add product to cart before redirect
                  window.location.href = './cart.html'; // Redirect to the cart page
              });
          } else {
              console.error('Product not found');
          }
      })
      .catch(err => console.error('Error fetching product data:', err));

  // Add to Cart Functionality
  function addToCart(product) {
      // Get the existing cart from localStorage or create an empty one
      let cart = JSON.parse(localStorage.getItem('cart')) || [];

      // Check if the product already exists in the cart
      const existingProduct = cart.find(item => item.id === product.id);

      if (existingProduct) {
          // If product exists, increase its quantity
          existingProduct.quantity += 1;
      } else {
          // If product does not exist, add it to the cart with quantity = 1
          cart.push({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image.thumbnail,
              quantity: 1,
          });
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Show success message
      showSuccessMessage("Product added to cart!");
  }

  // Function to show Bootstrap success alert
  function showSuccessMessage(message) {
      const alertContainer = document.getElementById('alert-container');

      // Create a Bootstrap alert element
      const alertDiv = document.createElement('div');
      alertDiv.className = 'alert alert-success alert-dismissible fade show';
      alertDiv.role = 'alert';
      alertDiv.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

      // Append to the alert container
      alertContainer.appendChild(alertDiv);

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
          alertDiv.classList.remove('show'); // Fade out
          alertDiv.classList.add('fade');   // Add fade effect
          setTimeout(() => alertDiv.remove(), 500); // Remove from DOM
      }, 3000);
  }
});
