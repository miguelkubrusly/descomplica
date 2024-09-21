import Product from "./class-product.js";

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

export default Button;
