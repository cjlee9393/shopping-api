"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET } = process.env;
const pepper = BCRYPT_PASSWORD;
const saltRounds = SALT_ROUNDS;
const tokenSecret = TOKEN_SECRET;
class UserStore {
    async index() {
        try {
            // @ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user. Error: ${err}`);
        }
    }
    async create(user) {
        try {
            const hash = bcrypt_1.default.hashSync(user.password + pepper, parseInt(saltRounds));
            const sql = 'INSERT INTO users (first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user.first_name, user.last_name, user.username, hash]);
            const newUser = result.rows[0];
            conn.release();
            return newUser;
        }
        catch (err) {
            throw new Error(`Could not add user. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const article = result.rows[0];
            conn.release();
            return article;
        }
        catch (err) {
            throw new Error(`Could not delete user. Error: ${err}`);
        }
    }
    async authenticate(username, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE username=($1)';
        const result = await conn.query(sql, [username]);
        // console.log(password + pepper);
        if (result.rows.length) {
            const user = result.rows[0];
            // console.log(user)
            if (bcrypt_1.default.compareSync(password + pepper, user.password_digest)) {
                user.password_digest = 'password_digest';
                const token = jsonwebtoken_1.default.sign({ user: user }, tokenSecret);
                return token;
            }
        }
        return null;
    }
}
exports.UserStore = UserStore;
