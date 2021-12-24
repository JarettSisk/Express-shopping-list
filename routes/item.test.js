// setting the node environment to test
process.env.NODE_ENV = 'test';

// imorts for supertest and express app
// Note: superest creates the test client, and works in conjuction with Jest
const request = require('supertest');
const app = require('../app');
// Import our mock database
const items = require('../fake-db');


let testItem = { name : 'apples', price : 1.99 };
// setup & teardown functions
beforeEach(() => {
    items.push(testItem);
})

afterEach(() => {
    items.length = 0;
})

// Get all items
describe('GET /api/items', () => {
    test('Get all items', async () => {
        const res = await request(app).get('/api/items');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ items: [ testItem ]});
    })
})

// Get single item
describe('GET /api/items/:name', () => {
    test('Get single item', async () => {
        const res = await request(app).get('/api/items/apples');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(testItem);
    })
})

// Create(POST) new item
describe('POST /api/items', () => {
    test('Create(POST) new item', async () => {
        let newItem = { name : 'chicken', price : 4.99 }
        const res = await request(app).post('/api/items').send(newItem);

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ item : newItem });
    })
})

// Update(PATCH) existing item
describe('PATCH /api/items/:name', () => {
    test('Update(PATCH) existing item', async () => {
        let updatedItem = { name : 'turkey', price : 21.99 }
        const res = await request(app).patch(`/api/items/${testItem.name}`).send(updatedItem);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ item : updatedItem });
    })
})

// Delete existing item
describe('DELETE /api/items/:name', () => {
    test('Delete existing item', async () => {
        const res = await request(app).delete(`/api/items/${testItem.name}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ "Sucessfully deleted" : testItem });
    })
})

