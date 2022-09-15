"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const chai_1 = require("chai");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
const secretToken = TOKEN_SECRET;
const store = new user_1.UserStore();
describe("User Store Model", () => {
    it('should have an index method', () => {
        (0, chai_1.expect)(store.index).to.not.be.undefined;
    });
    it('should have an show method', () => {
        (0, chai_1.expect)(store.show).to.not.be.undefined;
    });
    it('should have an create method', () => {
        (0, chai_1.expect)(store.create).to.not.be.undefined;
    });
    it('should have an delete method', () => {
        (0, chai_1.expect)(store.delete).to.not.be.undefined;
    });
    it('should have an authenticate method', () => {
        (0, chai_1.expect)(store.authenticate).to.not.be.undefined;
    });
    it('should create data to db', async () => {
        const first_name = 'userSpec';
        const last_name = 'last_name';
        const username = 'username';
        const password = 'password_digest';
        const result = await store.create({
            id: '',
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password
        });
        (0, chai_1.expect)(result.first_name).to.equal(first_name);
    });
    it('should index data from db', async () => {
        const first_name = 'first_name'; // added from data.sql
        let rows = await store.index();
        (0, chai_1.expect)(rows[0].first_name).to.equal(first_name);
    });
    it('should show a data from db', async () => {
        const id = '1'; // added from data.sql
        const first_name = 'first_name';
        const result = await store.show(id);
        (0, chai_1.expect)(result.first_name).to.equal(first_name);
    });
    it('should delete a data from db', async () => {
        const id = '2'; // added from data.sql
        await store.delete(id);
        let rows = await store.index();
        for (let row of rows) {
            (0, chai_1.expect)(row.id).to.not.be.oneOf([id]);
        }
    });
    it('should provide user authentication tokens', async () => {
        const username = 'username';
        const password_digest = 'password_digest';
        const token = await store.authenticate(username, password_digest);
        // console.log(`valid JWT: ${token}`)
        try {
            jsonwebtoken_1.default.verify(token, secretToken);
            (0, chai_1.expect)(0).to.equal(0);
        }
        catch (err) {
            console.log('error: ', err);
            (0, chai_1.expect)(0).to.equal(1);
        }
    });
});
