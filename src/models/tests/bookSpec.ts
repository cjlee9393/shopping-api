import { Book, BookStore } from '../book';
import { expect } from 'chai';

const store = new BookStore()

describe("Book Store Model", () => {
    it('should have an index method', () => {
        expect(store.index).to.not.be.undefined;
    });

    it('should have an create method', () => {
        expect(store.create).to.not.be.undefined;
    });

    it('should have an delte method', () => {
        expect(store.delete).to.not.be.undefined;
    });

    it('should index data from db', async () => {
        const rows = await store.index();

        console.log(rows[0]);

        expect(rows[0]).to.eql({
            id: 1,
            title: 'title', 
            author: 'author', 
            total_pages: 0,
            type: 'type',
            summary: 'summary'
        });

    });

    it('should create row in db', async () => {
        const result = await store.create({
            id: -1,
            title: 'The Selfish Gene',
            author: 'Richard Dawkins',
            total_pages: 224,
            type: 'Evolutionary Biology',
            summary: 'The Selfish Gene is a 1976 book on evolution by the ethologist Richard Dawkins, in which the author builds upon the principal theory of George C. Williams\'s Adaptation and Natural Selection.'
        });

        console.log(result);

        expect(result).to.eql({
            id: 2,
            title: 'The Selfish Gene',
            author: 'Richard Dawkins',
            total_pages: 224,
            type: 'Evolutionary Biology',
            summary: 'The Selfish Gene is a 1976 book on evolution by the ethologist Richard Dawkins, in which the author builds upon the principal theory of George C. Williams\'s Adaptation and Natural Selection.'
        });

        
    });

    it('should delete data from db', async () => {
        await store.delete('1');
        
        const rows = await store.index();

        if (rows.length) expect(rows[0].id).to.not.be.oneOf([1]);        
    });
});