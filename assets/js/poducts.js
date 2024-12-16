document.addEventListener("DOMContentLoaded", function () {
    // Get the element where products will be displayed
    const product_list = document.querySelector(".product_list"); // Targeting the product list container
  
    // Debugging log: Check if the element is found
    console.log(product_list);  // Check if this returns null
  
    if (!product_list) {
      console.error("product_list element not found!");
      return; // Stop execution if element is not found
    }
  
    // Fetch the products data from the JSON file under the data directory
    fetch("../../data/products.json")
      .then((response) => response.json())  // Parse JSON data
      .then((products) => {
        // Loop through each product and create HTML elements
        products.forEach((product) => {
          // Create a div element to contain each product
          const productDiv = document.createElement("div");
          productDiv.classList.add("col-md-4"); // 
  
          // Add product details inside the div
          productDiv.innerHTML = `
            <div class="card mt-3">
              <a href="./prod_details.html?id=${product.id}">
                <img src="${product.image.thumbnail}" height="250px" class="card-img-top" alt="${product.name}">
              </a>
              <div class="card-body">
               <a href="./prod_details.html?id=${product.id}"> <h5 class="card-title">${product.name}</h5></a>
                <p>Category: ${product.category}</p>
                <p>$${product.price.toFixed(2)}</p>
                <a href="./prod_details.html?id=${product.id}" class="btn btn-outline-primary">View Details</a>
              </div>
            </div>
          `;
  
          // Add the created product div to the main container on the page
          product_list.appendChild(productDiv);
        });
      })
      .catch((error) => {
        console.error("Sorry, there was an error:", error);
      });
  });



  

 