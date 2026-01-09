const { getDB } = require('../data/connection');
const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'posts';

async function getAllPosts(filter = {}, sort = {}) {
    const db = getDB();
    const posts = await db.collection(COLLECTION_NAME)
        .find(filter)
        .sort(sort)
        .toArray();
    return posts;
}

async function getPostById(id) {
    const db = getDB();
    return await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
}

async function createPost(title, content, authorId, authorUsername) {
    const db = getDB();
    const result = await db.collection(COLLECTION_NAME).insertOne({
        title,
        content,
        authorId: new ObjectId(authorId),
        authorUsername,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return await db.collection(COLLECTION_NAME).findOne({ _id: result.insertedId });
}

async function updatePost(id, userId, title, content) {
    const db = getDB();
    const result = await db.collection(COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(id), authorId: new ObjectId(userId) },
        { $set: { title, content, updatedAt: new Date() } },
        { returnDocument: 'after' }
    );
    return result;
}

async function deletePost(id, userId) {
    const db = getDB();
    const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id), authorId: new ObjectId(userId) });
    return result.deletedCount;
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};