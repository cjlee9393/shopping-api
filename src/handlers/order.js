"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
const index = async (_req, res) => {
    try {
        const orders = await store.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const order = await store.show(req.params.id);
        res.json(order);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const order = {
            order_status: req.body.status,
            user_id: req.body.user_id
        };
        const result = await store.create(order);
        res.json(result);
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
const addProduct = async (req, res) => {
    try {
        const orderId = req.params.id;
        const quantity = parseInt(req.body.quantity);
        const productId = req.body.productId;
        const result = await store.addProduct(quantity, orderId, productId);
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
/*const showCurrentOrderByUser = async (req: Request, res: Response) => {
    try{
        const order = await store.show(req.params.id);
        res.json(order);
    }catch(err){
        res.status(400).json(err);
    }
}*/
const orders_routes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    app.post('/orders/:id/products', addProduct);
    app.delete('/orders', destroy);
};
exports.default = orders_routes;
