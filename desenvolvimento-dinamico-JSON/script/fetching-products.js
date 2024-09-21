const fetch = require("node-fetch");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      addProductToPage(product);
    });
  });

function addProductToPage(product) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.setAttribute("product-id", product.id);
  productDiv.innerHTML = `
    <div
      class="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded"
    >
      <div class="mr-1">
        <img class="rounded" src="${product.image}" width="70" alt="${product.title}"/>
      </div>
      <div
        class="d-flex flex-column align-items-center product-details"
      >
        <span class="font-weight-bold name">${product.title}</span>
        <div class="d-flex flex-row product-desc">
          <div class="size mr-1">
            <span class="text-grey">Rating:</span
            ><span class="font-weight-bold">&nbsp;${product.rating.rate} (${product.rating.count} votes)</span>
          </div>
            <div class="size mr-1">
            <span class="text-grey">Description:</span
            ><span class="font-weight-bold">${product.description}</span>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row align-items-center qty">
        <i class="fa fa-minus text-danger"></i>
        <h5 class="text-grey mt-1 mr-1 ml-1">1</h5>
        <i class="fa fa-plus text-success"></i>
      </div>
      <div class="price">
        <h5 class="text-grey">$${product.price}</h5>
      </div>
      <div class="d-flex align-items-center">
        <i class="fa fa-trash mb-1 text-danger"></i>
      </div>
    </div>
  `;
  document.body.appendChild(productDiv);
}
