import { Order, OrderStore } from '../models/order'
import express, { Request, Response } from 'express'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
    try{
        const orders = await store.index()
        res.json(orders)
    }catch(err){
        res.status(400).json(err);
    }
}

const show = async (req: Request, res: Response) => {
    try{
        const order = await store.show(req.params.id);
        res.json(order);
    }catch(err){
        res.status(400).json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try{
        const order = {
            status: req.body.status,
            user_id: req.body.user_id
        };

        const result = await store.create(order as Order)
        res.json(result)
    }catch(err){
        res.status(400).json(err);
    }
}

const destroy = async (req: Request, res: Response) => {
    try{
        const deleted = await store.delete(req.query.id as string)
        res.json(deleted)
    }catch(err){
        res.status(400).json(err);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try{
        const quantity = req.body.quantity
        const orderId = req.body.orderId
        const productId = req.body.productId

        const result = await store.addProduct(quantity, orderId, productId)
        res.json(result)
    }catch(err){
        res.status(400).json(err);
    }
}

const orders_routes = (app: express.Application) => {
	app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', create)
    app.post('/orders/:id', addProduct)
    app.delete('/orders', destroy)
}

export default orders_routes