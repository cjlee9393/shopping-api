import { Order, OrderProduct, OrderStore } from '../order';
import { User, UserStore } from '../user';
import { Product, ProductStore } from '../product';
import { expect } from 'chai';

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()

describe("Order Store Model", () => {
    it('should have an index method', () => {
        expect(orderStore.index).to.not.be.undefined;
    });

    it('should have an show method', () => {
        expect(orderStore.show).to.not.be.undefined;
    });

    it('should have an create method', () => {
        expect(orderStore.create).to.not.be.undefined;
    });

    it('should have an delete method', () => {
        expect(orderStore.delete).to.not.be.undefined;
    });

    it('should create, index, and delete data from db', async () => {
        const userResult = await userStore.create({
            id: '',
            first_name: 'first_name',
            last_name: 'last_name',
            username: 'username',
            password: 'password_digest',
        });
        const userId = userResult.id;

        // test create
        const orderStatus = 'active';
        const orderResult = await orderStore.create({
            id: '',
            order_status: orderStatus,
            user_id: userId as string
        });
 
        expect(orderResult.order_status).to.equal(orderStatus);

        // test index
        let orderRows = await orderStore.index();
        expect(orderRows[0].order_status).to.equal(orderStatus);

        // test delete
        let orderId = orderRows[0].id;
        await orderStore.delete(`${orderId}`);
        orderRows = await orderStore.index();
        if (orderRows.length) expect(orderRows[0].id).to.not.be.oneOf([orderId]);   

        await userStore.delete(`${userId}`);
    });

    it('should add product to order', async () => {
        const userResult = await userStore.create({
            id: '',
            first_name: 'first_name',
            last_name: 'last_name',
            username: 'username',
            password: 'password_digest',
        });
        const userId = userResult.id;

        const orderResult = await orderStore.create({
            id: '',
            order_status: 'active',
            user_id: userId as string
        });
        const orderId = orderResult.id;

        const productResult = await productStore.create({
            id: '',
            name: 'name',
            price: 0
        });
        const productId = productResult.id;

        const quantity = 1;
        const addProductResult = await orderStore.addProduct(quantity, orderId, productId);
        expect(addProductResult.quantity).to.equal(quantity);

        const orderProductId = addProductResult.id;
        await orderStore.delProduct(`${orderProductId}`);
        await orderStore.delete(`${orderId}`); 
        await userStore.delete(`${userId}`);
    });
});