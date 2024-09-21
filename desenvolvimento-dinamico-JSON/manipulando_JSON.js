const fetch = require('node-fetch');

fetch('https://fakestoreapi.com/products')
            .then(response=>response.json())
            .then(data => {
              data.forEach(product => {
                addProductToPage(product);
              });
            })

function addProductToPage(product) {
  const productDiv = document.createElement('div');
  productDiv.classList.add('product');
  productDiv.setAttribute('product-id', product.id).add('product');
  productDiv.innerHTML = `
  <li>  
    <h2>${product.title}</h2>
    <img src="${product.image}" alt="${product.title}">
    <p>${product.description}</p>
    <p>Price: $${product.price}</p>
    <product
  </li>
  `;
  document.body.appendChild(productDiv);
}