"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookStore = void 0;
const database_1 = __importDefault(require("../database"));
class BookStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async create(b) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *';
            const result = await conn.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary]);
            const book = result.rows[0];
            conn.release();
            return book;
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM books WHERE id=($1)';
            const result = await conn.query(sql, [id]);
        }
        catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}
exports.BookStore = BookStore;
