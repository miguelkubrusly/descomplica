import Product from "./class-product.js";

const products = document.querySelectorAll(".product");
const sortMethods = document.querySelectorAll(".dropdown-item");

//starting products
document.addEventListener("DOMContentLoaded", () => {
  products.forEach(function (product) {
    const productName = product.querySelector(".name").textContent;
    const productTotalPrice = Product.priceToFloat(
      product.querySelector(".price").querySelector("h5").textContent
    );
    const productQuantity = parseInt(
      product.querySelector(".qty").querySelector("h5").textContent
    );
    new Product(product, productName, productTotalPrice, productQuantity);
  });

  sortMethods.forEach(function (sortMethod) {
    sortMethod.addEventListener("click", () =>
      Product.sortProducts(sortMethod.innerHTML.trim())
    );
  });
});
