"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const token_auth = process.env.TOKEN_AUTH;
const request = (0, supertest_1.default)(server_1.default);
describe('Products API Endpoints', () => {
    it('Create: \'products\' [POST] should create data to db', (done) => {
        const name = 'productSpec';
        const price = '0';
        request
            .post('/products')
            .send({
            name: name,
            price: price
        })
            .set('Authorization', `bearer ${token_auth}`)
            .expect(201)
            .then((res) => {
            (0, chai_1.expect)(res.body.name).to.equal(name);
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
    it('Index: \'products\' [GET] should get data from db', (done) => {
        const name = 'name';
        request
            .get('/products')
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body[0].name).to.equal(name);
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
    it('Show: \'products/:id\' [GET] should get a data from db', (done) => {
        const id = '1';
        const name = 'name';
        request
            .get(`/products/${id}`)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.name).to.equal(name);
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
});
