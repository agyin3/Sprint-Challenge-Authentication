
const request = require('supertest')
const db = require('../database/dbConfig.js')
const Users = require('../auth/auth-model')
const server = require('./server.js')

describe('User auth', () => {

    beforeEach(async () => {
        await db('users').truncate()
    })

    it('should add new user', async () => {
        const user = {username: 'Badazz', password: 'test'}
        const res = await Users.add(user)
        const users = await db('users')

        expect(users).toHaveLength(1)
    })
    
    it('should find registered user', async () => {
        const user = {username: 'Badazz1', password: 'test'}
        const user2 = {username: 'Badazz2', password: 'test'}
        const user3 = {username: 'Badazz3', password: 'test'}
        await Users.add(user)
        await Users.add(user2)
        await Users.add(user3)

        const found = await Users.findBy({username: user2.username})

        expect(found.username).toBe(user2.username)
    })
    
})