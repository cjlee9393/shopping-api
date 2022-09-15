"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get article ${id}. Error: ${err}`);
        }
    }
    async create(o) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO orders (order_status, user_id) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [o.order_status, o.user_id]);
            const order = result.rows[0];
            conn.release();
            return order;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async addProduct(quantity, orderId, productId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const result = await conn.query(sql, [quantity, orderId, productId]);
            const orderProduct = result.rows[0];
            conn.release();
            return orderProduct;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async delProduct(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM order_products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}
exports.OrderStore = OrderStore;
