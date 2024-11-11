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

export default Product;
