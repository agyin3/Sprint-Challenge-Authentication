const db = require('../database/dbConfig.js')

module.exports = {
    add,
    findBy,
    findById
}

function findById(id){
    return db('users') 
        .where({id})
        .first()
}

function findBy(filter){
    console.log(filter)
    return db('users')
        .where(filter)
        .select('username', 'password')
        .first()
}

function add(user){
    console.log(user)
    return db('users')
        .insert(user)
        .then(id => findById(id[0]))
}