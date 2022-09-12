"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    async productsInOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT products.id, name, price, quantity, order_id FROM products INNER JOIN order_products ON products.id = order_products.product_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async usersWithOrders() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT users.id, username, status FROM users INNER JOIN orders ON users.id=orders.user_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async mostExpensiveProducts() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products ORDER BY price DESC LIMIT 5';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
