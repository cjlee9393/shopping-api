import { expect } from 'chai';
import app from '../../server'
import supertest from 'supertest'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()
const token_auth = process.env.TOKEN_AUTH
const token_secret = process.env.TOKEN_SECRET
const request = supertest(app)

describe('Orders API Endpoints', () => {
    it('Create: \'orders\' [POST] should create data to db', (done) => {
        const decoded = jwt.verify(token_auth as string, token_secret as string)
        const userId = (decoded as any).user.user_id
        const orderStatus = 'active'

        request
            .post(`/orders`)
            .set('Authorization', `bearer ${token_auth}`)
            .expect(201)
            .then((res) => {
                expect(res.body.userId).to.be.equal(userId)
                expect(res.body.order_status).to.be.equal(orderStatus)
                return done()
            })
            .catch((err) => {
                throw err
            })               
    })

    it('Current Order by user \'orders/:id\' [GET] should get current order by user from db', (done) => {
        const userId = '1'; // added in data.sql
        const orderStatus = 'active'

        request
            .get(`/orders/${userId}`)
            .set('Authorization', `bearer ${token_auth}`)
            .expect(200)
            .then((res) => {
                for (let row of res.body){
                    expect(row.user_id).to.be.equal(userId)
                    expect(row.order_status).to.be.equal(orderStatus)
                }
                return done()
            })
            .catch((err) => {
                throw err
            })               
    })
})