"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = require("../book");
const chai_1 = require("chai");
const store = new book_1.BookStore();
describe("Book Store Model", () => {
    it('should have an index method', () => {
        (0, chai_1.expect)(store.index).to.not.be.undefined;
    });
    it('should have an create method', () => {
        (0, chai_1.expect)(store.create).to.not.be.undefined;
    });
    it('should have an delte method', () => {
        (0, chai_1.expect)(store.delete).to.not.be.undefined;
    });
    it('should index data from db', async () => {
        const rows = await store.index();
        (0, chai_1.expect)(rows[0]).to.equal({
            id: 1,
            title: 'title',
            author: 'author',
            total_pages: 0,
            type: 'type',
            summary: 'summary'
        });
        console.log(rows[0]);
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
        (0, chai_1.expect)(result).to.equal({
            id: 2,
            title: 'The Selfish Gene',
            author: 'Richard Dawkins',
            total_pages: 224,
            type: 'Evolutionary Biology',
            summary: 'The Selfish Gene is a 1976 book on evolution by the ethologist Richard Dawkins, in which the author builds upon the principal theory of George C. Williams\'s Adaptation and Natural Selection.'
        });
        console.log(result);
    });
    it('should delete data from db', async () => {
        await store.delete('1');
        const rows = await store.index();
        if (rows.length)
            (0, chai_1.expect)(rows[0].id).to.not.be.oneOf([1]);
    });
});
