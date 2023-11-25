// Function to display response messages
function displayMessage(selector, message) {
  $(selector).text(message);
}

// Function to fetch and display products
function fetchProducts() {
  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/products",
    method: "GET",
    success: function (response) {
      let productList = $("#productList");
      productList.empty();
      response.forEach(function (product) {
        productList.append(
          `<li>ID: ${product.id}, Name: ${product.name}, Price: ${product.price}</li>`
        );
      });
    },
  });
}

// Function to add a product
function addProduct() {
  let productName = $("#productName").val();
  let productPrice = $("#productPrice").val();

  $.ajax({
    url: "https://usman-fake-api.herokuapp.com/products",
    method: "POST",
    data: { name: productName, price: productPrice },
    success: function (response) {
      displayMessage("#addResponse", `Product added with ID: ${response.id}`);
      fetchProducts();
    },
    error: function (error) {
      displayMessage("#addResponse", `Error: ${error.responseJSON.error}`);
    },
  });
}

// Function to update a product
function updateProduct() {
  let productId = $("#updateProductId").val();
  let productName = $("#updateProductName").val();
  let productPrice = $("#updateProductPrice").val();

  $.ajax({
    url: `https://usman-fake-api.herokuapp.com/products/${productId}`,
    method: "PUT",
    data: { name: productName, price: productPrice },
    success: function () {
      displayMessage(
        "#updateResponse",
        `Product updated with ID: ${productId}`
      );
      fetchProducts();
    },
    error: function (error) {
      displayMessage("#updateResponse", `Error: ${error.responseJSON.error}`);
    },
  });
}

// Function to delete a product
function deleteProduct() {
  let productId = $("#deleteProductId").val();

  $.ajax({
    url: `https://usman-fake-api.herokuapp.com/products/${productId}`,
    method: "DELETE",
    success: function () {
      displayMessage(
        "#deleteResponse",
        `Product deleted with ID: ${productId}`
      );
      fetchProducts();
    },
    error: function (error) {
      displayMessage("#deleteResponse", `Error: ${error.responseJSON.error}`);
    },
  });
}

// Fetch and display products when the page loads
$(document).ready(function () {
  fetchProducts();
});
