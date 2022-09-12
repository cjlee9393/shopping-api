import { Product, ProductStore } from '../product';
import { expect } from 'chai';

const store = new ProductStore()

describe("Product Store Model", () => {
    it('should have an index method', () => {
        expect(store.index).to.not.be.undefined;
    });

    it('should have an show method', () => {
        expect(store.show).to.not.be.undefined;
    });

    it('should have an create method', () => {
        expect(store.create).to.not.be.undefined;
    });

    it('should have an delete method', () => {
        expect(store.delete).to.not.be.undefined;
    });

    it('should create, index, and delete data from db', async () => {
        const result = await store.create({
            id: '',
            name: 'name',
            price: 0
        });

        const id = result.id;
        let rows = await store.index();

        expect(rows[0].id).to.equal(id);

        await store.delete(`${rows[0].id}`);

        rows = await store.index();

        if (rows.length) expect(rows[0].id).to.not.be.oneOf([id]);   
    });
});