// server.js

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 }
];

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Add a new product
app.post('/api/products', (req, res) => {
    const { name, price } = req.body;

    if (!name || !price) {
        res.status(400).send('Name and price are required');
        return;
    }

    // Incorrect ID incrementation
    const id = products.length + 1;
    const newProduct = { id, name, price };
    products.push(newProduct);

    res.json(newProduct);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        // Incomplete error handling
        res.status(404).send('Product not found');
        return;
    }

    res.json(product);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
