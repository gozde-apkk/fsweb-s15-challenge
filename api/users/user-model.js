const db = require("../../data/dbConfig");

const get = () =>{
    return db("users")
}
const getById = (id) =>{
    return db("users").where({id:id}).first();
}

const getByFilter = (filter) =>{
    return db("users").where(filter)
}

const insert =async (user) =>{
 const ids= await   db('users').insert(user)
    return getById(ids[0])
}

module.exports = {
    get,getByFilter,getById,insert
}

