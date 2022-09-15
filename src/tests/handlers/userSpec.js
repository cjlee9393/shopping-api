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
describe('Users API Endpoints', () => {
    it('Create: \'users\' [POST] should create data to db', (done) => {
        const firstName = 'userSpec';
        const lastName = 'lastName';
        const username = 'username';
        const password = 'password_digest';
        request
            .post('/users')
            .send({
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password
        })
            .set('Authorization', `bearer ${token_auth}`)
            .expect(201)
            .then((res) => {
            (0, chai_1.expect)(res.body.first_name).to.equal(firstName);
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
    it('Index: \'users\' [GET] should get data from db', (done) => {
        const firstName = 'firstName'; // added in data.sql
        request
            .get('/users')
            .set('Authorization', `bearer ${token_auth}`)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body[0].first_name).to.equal(firstName);
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
    it('Show: \'users/:id\' [GET] should get a data from db', (done) => {
        const id = '1';
        const firstName = 'first_name';
        request
            .get(`/users/${id}`)
            .set('Authorization', `bearer ${token_auth}`)
            .expect(200)
            .then((res) => {
            (0, chai_1.expect)(res.body.first_name).to.equal(firstName);
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
});
