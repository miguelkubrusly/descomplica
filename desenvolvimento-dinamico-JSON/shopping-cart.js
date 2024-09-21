const plusButtons = document.querySelectorAll(".fa-plus");
const minusButtons = document.querySelectorAll(".fa-minus");
const trashButtons = document.querySelectorAll(".fa-trash");
const products = document.querySelectorAll(".product");
const sortMethods = document.querySelectorAll(".dropdown-item");

let qtyFromHtml; // "qty" is a nomenclature from bootstrap
let quantity;
let priceFromHtml;
let totalPrice;
let price;

class Product {
  static allInstances = [];
  static id = 0;

  constructor(element, name, totalPrice, quantity) {
    this.element = element;
    console.log("Element in constructor:", this.element);
    this._id = Product.id;
    this._name = name;
    quantity < 1 ? (this._quantity = 1) : (this._quantity = quantity);
    this._totalPrice = totalPrice;
    this._price = totalPrice / quantity;
    this.removed = false;

    Product.allInstances.push(this);
    Product.allInstances.sort((a, b) => a.id - b.id);
    Product.id++;

    this.element.setAttribute("product-id", this._id);
  }
  static getAllInstances() {
    return Product.allInstances;
  }

  update({ newQuantity, newTotalPrice, removed }) {
    if (removed !== undefined) this.removed = removed;

    if (newQuantity !== undefined) {
      this._quantity = newQuantity;
      this._totalPrice = this._price * newQuantity;
    }
    if (newTotalPrice !== undefined) this._totalPrice = newTotalPrice;

    Product.allInstances = Product.allInstances.filter(
      (product) => product._id !== this._id
    );
    Product.allInstances.push(this);
    Product.allInstances.sort((a, b) => a._id - b._id);
  }
  get name() {
    return this._name;
  }
  get quantity() {
    return this._quantity;
  }
  get totalPrice() {
    return this._totalPrice;
  }
  get price() {
    return this._price;
  }
  get id() {
    return this._id;
  }

  set quantity(newQuantity) {
    this._quantity = newQuantity;
    this.update({ newQuantity: newQuantity });
    this.element.querySelector(".qty h5").innerHTML = newQuantity;
  }
  set totalPrice(newTotalPrice) {
    this._totalPrice = newTotalPrice;
    this.update({ newTotalPrice: newTotalPrice });
    this.element.querySelector(".price h5").innerHTML =
      Product.floatToPrice(newTotalPrice);
  }
  removeElement() {
    this.removed = true;
    this.update({ removed: true });
    this.element.remove();
  }

  static sortProducts = (method) => {
    let activeProducts = Product.allInstances.filter(
      (product) => product.removed === false
    );
    switch (method) {
      case "Individual price":
        activeProducts = activeProducts.sort((a, b) => b._price - a._price);
        break;
      case "Total price":
        activeProducts = activeProducts.sort(
          (a, b) => b._totalPrice - a._totalPrice
        );
        break;
      case "Quantity":
        activeProducts = activeProducts.sort(
          (a, b) => b._quantity - a._quantity
        );
        break;
      default:
        break;
    }
    document.getElementById("products-list").innerHTML = "";
    activeProducts.forEach((product) => {
      document.getElementById("products-list").appendChild(product.element);
    });
    Product.allInstances.sort((a, b) => a._id - b._id);
  };

  static priceToFloat(price) {
    return parseFloat(price.replace("$", "").trim());
  }
  static floatToPrice(price) {
    return "$" + price.toFixed(2);
  }
}

class Button {
  constructor(element) {
    this.element = element;
    this.product = this.relativeProduct();
  }
  relativeProduct() {
    const productElement = this.element.closest(".product");
    const productId = parseInt(productElement.getAttribute("product-id"));
    return Product.allInstances.find((product) => product._id === productId);
  }

  addItem = () => {
    this.product.quantity++;
    this.product.totalPrice = this.product.price * this.product.quantity;
  };

  removeItem = () => {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.product.totalPrice = this.product.price * this.product.quantity;
    } else if (this.product.quantity <= 1) {
      this.deleteProduct();
    }
  };

  deleteProduct = () => {
    const confirmation = confirm("Are you sure you want to remove this item?");
    if (confirmation) {
      this.product.removeElement();
      alert("Este item foi removido do carrinho");
    }
  };
}

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
