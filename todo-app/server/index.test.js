import { expect } from 'chai';

const base_url = 'http://localhost:3001/';

describe('GET tasks', () => {
    it('should get all tasks', async () => {
        const response = await fetch(base_url);
        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.be.an('array');
    });
});

describe('POST task', () => {
    it('should post a task', async () => {
        const response = await fetch(base_url + 'new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'description': 'Task from unit test'})
        });
        const data = await response.json();
        expect(response.status).to.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id');
    });

    it('should not post a task without description', async () => {
        const response = await fetch(base_url + 'new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });
        const data = await response.json();
        expect(response.status).to.equal(500);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    });
});

describe('DELETE task', () => {
    it('should delete a task', async () => {
        // First create a task to delete
        const createResponse = await fetch(base_url + 'new', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'description': 'Task to be deleted'})
        });
        const createData = await createResponse.json();
        
        // Then delete it
        const deleteResponse = await fetch(base_url + 'delete/' + createData.id, {
            method: 'delete'
        });
        const deleteData = await deleteResponse.json();
        expect(deleteResponse.status).to.equal(200);
        expect(deleteData).to.be.an('object');
        expect(deleteData).to.include.all.keys('id');
    });
});