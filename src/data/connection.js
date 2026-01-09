const { MongoClient } = require('mongodb');

const uri = 'mongodb://admin:admin@127.0.0.1:27017/blogDB?authSource=admin';
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    await client.connect();
    db = client.db('blogDB');
    console.log('Połączono z MongoDB');
  } catch (error) {
    console.error('Błąd połączenia z MongoDB:', error);
  }
}

function getDB() {
    if (!db) throw new Error('Baza danych nie jest połączona.');
    return db;
  }

module.exports = { connectDB, getDB };