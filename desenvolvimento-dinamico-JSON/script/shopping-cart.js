import Product from "./class-product.js";
import Button from "./class-button.js";

const plusButtons = document.querySelectorAll(".fa-plus");
const minusButtons = document.querySelectorAll(".fa-minus");
const trashButtons = document.querySelectorAll(".fa-trash");
const products = document.querySelectorAll(".product");
const sortMethods = document.querySelectorAll(".dropdown-item");

//starting products
products.forEach(function (product) {
  const productName = product.querySelector(".name").innerHTML;
  const productTotalPrice = Product.priceToFloat(
    product.querySelector(".price").querySelector("h5").innerHTML
  );
  const productQuantity = parseInt(
    product.querySelector(".qty").querySelector("h5").innerHTML
  );
  new Product(product, productName, productTotalPrice, productQuantity);
});
//starting buttons
plusButtons.forEach(function (plusButton) {
  const oneButton = new Button(plusButton);
  oneButton.element.addEventListener("click", oneButton.addItem);
});

minusButtons.forEach(function (minusButton) {
  const oneButton = new Button(minusButton);
  oneButton.element.addEventListener("click", oneButton.removeItem);
});

trashButtons.forEach(function (trashButton) {
  const oneButton = new Button(trashButton);
  oneButton.element.addEventListener("click", oneButton.deleteProduct);
});
sortMethods.forEach(function (sortMethod) {
  sortMethod.addEventListener("click", () =>
    Product.sortProducts(sortMethod.innerHTML.trim())
  );
});
