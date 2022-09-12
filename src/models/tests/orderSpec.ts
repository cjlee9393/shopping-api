import { Order, OrderStore } from '../order';
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

        const user_id = userResult.id;

        const orderResult = await orderStore.create({
            id: '',
            order_status: 'active',
            user_id: user_id as string
        });

        const orderId = orderResult.id;
        let orderRows = await orderStore.index();

        expect(orderRows[0].id).to.equal(orderId);

        await orderStore.delete(`${orderRows[0].id}`);

        orderRows = await orderStore.index();

        if (orderRows.length) expect(orderRows[0].id).to.not.be.oneOf([orderId]);   

        await userStore.delete(`${user_id}`);
    });
});