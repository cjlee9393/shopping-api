"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const user_1 = require("./user");
const store = new product_1.ProductStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price
        };
        const result = await store.create(product);
        res.status(201).json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.query.id);
        res.json(deleted);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const products_routes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', user_1.verifyAuthToken, create);
    app.delete('/products', destroy);
};
exports.default = products_routes;
