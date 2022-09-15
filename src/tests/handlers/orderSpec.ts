import { expect } from 'chai';
import app from '../../server'
import supertest from 'supertest'
import dotenv from 'dotenv'

dotenv.config()
const token_auth = process.env.TOKEN_AUTH
const request = supertest(app)

describe('Orders API Endpoints', () => {
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