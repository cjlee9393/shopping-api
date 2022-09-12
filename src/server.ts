import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import orders_routes from './handlers/order'
import products_routes from './handlers/product'
import dashboard_routes from './handlers/dashboard'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

orders_routes(app)
products_routes(app)
dashboard_routes(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
