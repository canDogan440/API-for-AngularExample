const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = () => {
    //MongoClient.connect('mongodb://localhost/node-app')
    MongoClient.connect('mongodb+srv://can:cantest@cluster0.xurxi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',(err,db) => {
        _db = db;
        console.log('DB CONENCTED');
    })
        
}

const getdb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database';
}


exports.mongoConnect = mongoConnect;
exports.getdb = getdb;