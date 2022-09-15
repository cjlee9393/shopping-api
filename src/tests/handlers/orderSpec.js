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
describe('Orders API Endpoints', () => {
    it('Current Order by user (args: user id)[token required]: \'orders/:id\' [GET] should get a data from db', (done) => {
        const userId = '1'; // added in data.sql
        const orderStatus = 'active';
        request
            .get(`/orders/${userId}`)
            .set('Authorization', `bearer ${token_auth}`)
            .expect(200)
            .then((res) => {
            for (let row of res.body) {
                (0, chai_1.expect)(row.user_id).to.be.equal(userId);
                (0, chai_1.expect)(row.order_status).to.be.equal(orderStatus);
            }
            return done();
        })
            .catch((err) => {
            throw err;
        });
    });
});
