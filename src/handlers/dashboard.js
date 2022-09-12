"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../services/dashboard");
const queries = new dashboard_1.DashboardQueries();
const productsInOrders = async (_req, res) => {
    try {
        const result = await queries.productsInOrders();
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const usersWithOrders = async (_req, res) => {
    try {
        const result = await queries.usersWithOrders();
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const mostExpensiveProducts = async (_req, res) => {
    try {
        const result = await queries.mostExpensiveProducts();
        res.json(result);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const dashboard_routes = (app) => {
    app.get('/products-in-orders', productsInOrders);
    app.get('/users-with-orders', usersWithOrders);
    app.get('/most-expensive-products', mostExpensiveProducts);
};
exports.default = dashboard_routes;
