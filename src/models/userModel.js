const bcrypt = require('bcryptjs');
const { getDB } = require('../data/connection');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'users';

async function findUserByUsername(username) {
    const db = getDB();
    return await db.collection(COLLECTION_NAME).findOne({ username });
}

async function createUser(username, password) {
    const db = getDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection(COLLECTION_NAME).insertOne({
        username,
        password: hashedPassword,
        createdAt: new Date()
    });
    return { _id: result.insertedId, username };
}

async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

async function findUserById(id) {
    const db = getDB();
    return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) }, { projection: { password: 0 } });
}

module.exports = {
    findUserByUsername,
    createUser,
    comparePassword,
    findUserById,
};