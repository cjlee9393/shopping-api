import { User, UserStore } from '../user';
import { expect } from 'chai';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
const { TOKEN_SECRET } = process.env
const secretToken = TOKEN_SECRET;

const store = new UserStore()

describe("User Store Model", () => {
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

    it('should have an authenticate method', () => {
        expect(store.authenticate).to.not.be.undefined;
    });

    it('should create, index, and delete data from db', async () => {
        const result = await store.create({
            id: '',
            first_name: 'first_name',
            last_name: 'last_name',
            username: 'username',
            password: 'password_digest',
        });

        const id = result.id;
        const password_digest = result.password;
        let rows = await store.index();

        expect(rows[0].password).to.equal(password_digest);

        await store.delete(`${rows[0].id}`);

        rows = await store.index();

        if (rows.length) expect(rows[0].id).to.not.be.oneOf([id]);   
    });

    it('should provide user authentication tokens', async () => {
        const result = await store.create({
            id: '',
            first_name: 'first_name',
            last_name: 'last_name',
            username: 'username',
            password: 'password_digest',
        });

        const token = await store.authenticate('username', 'password_digest');

        try{
            jwt.verify(token as string, secretToken as string)
            expect(0).to.equal(0);
        }catch(err){
            console.log('error: ', err);
            expect(0).to.equal(1);
        }

        await store.delete(`${result.id}`);
    });
});