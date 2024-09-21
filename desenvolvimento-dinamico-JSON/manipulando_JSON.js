const fetch = require('node-fetch');

fetch('https://fakestoreapi.com/products')
            .then(response=>response.json())
            .then(json=>console.log(json))