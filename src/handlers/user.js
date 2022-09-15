"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const secretToken = TOKEN_SECRET;
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        jsonwebtoken_1.default.verify(token, secretToken);
    }
    catch (err) {
        res.status(401).json(err);
        return;
    }
    next();
};
exports.verifyAuthToken = verifyAuthToken;
const store = new user_1.UserStore();
const index = async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(400).json(err);
    }
};
const show = async (req, res) => {
    try {
        const users = await store.show(req.params.id);
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};
const create = async (req, res) => {
    try {
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: req.body.password
        };
        const result = await store.create(user);
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
const users_routes = (app) => {
    app.get('/users', exports.verifyAuthToken, index);
    app.get('/users/:id', exports.verifyAuthToken, show);
    app.post('/users', exports.verifyAuthToken, create);
    app.delete('/users', exports.verifyAuthToken, destroy);
};
exports.default = users_routes;
