import { OrderStore } from '../../models/order';
import { UserStore } from '../../models/user';
import { ProductStore } from '../../models/product';
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

    it('should create data to db', async () => {
        const userId = '1' // added from data.sql
        const orderStatus = 'complete';

        const orderResult = await orderStore.create({
            id: '',
            order_status: orderStatus,
            user_id: userId as string
        });
 
        expect(orderResult.order_status).to.equal(orderStatus);
    });

    it('should index data from db', async () => {
        const userId = '1' // added from data.sql

        let orderRows = await orderStore.index();
        expect(orderRows[0].user_id).to.equal(userId);
    });

    it('should delete data from db', async () => {
        let orderId = '2' // added from data.sql

        await orderStore.delete(`${orderId}`);

        const orderRows = await orderStore.index();

        for (let orderRow of orderRows){
            expect(orderRow.id).to.not.be.oneOf([orderId])
        }
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

    it('should show current order by user', async () => {
        const userId = '1'; // added in data.sql
        const orderStatus = 'active'

        const rows = await orderStore.showCurrentOrderByUser(userId);

        for (let row of rows){
            expect(row.user_id).to.be.equal(userId)
            expect(row.order_status).to.be.equal(orderStatus)
        }
    });
});