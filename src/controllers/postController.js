const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const { ObjectId } = require('mongodb');

async function getPosts(req, res) {
    try {
        const { authorId, sortBy, sortOrder = 'desc' } = req.query;
        let filter = {};
        if (authorId) {
            filter.authorId = new ObjectId(authorId);
        }

        let sort = {};
        if (sortBy === 'date') {
            sort.createdAt = sortOrder === 'asc' ? 1 : -1;
        } else if (sortBy === 'title') {
            sort.title = sortOrder === 'asc' ? 1 : -1;
        }

        const posts = await postModel.getAllPosts(filter, sort);
        res.status(200).json(posts);
    } catch (error) {
        console.error('Błąd podczas pobierania postów:', error);
        res.status(500).json({ message: 'Błąd serwera podczas pobierania postów.' });
    }
}

async function getPost(req, res) {
    try {
        const { id } = req.params;
        const post = await postModel.getPostById(id);
        if (!post) {
            return res.status(404).json({ message: 'Nie znaleziono posta.' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error('Błąd podczas pobierania posta:', error);
        res.status(500).json({ message: 'Błąd serwera podczas pobierania posta.' });
    }
}

async function createPost(req, res) {
    const { title, content, authorId } = req.body;
    if (!title || !content || !authorId) {
        return res.status(400).json({ message: 'Tytuł, treść i ID autora są wymagane.' });
    }
    try {
        const author = await userModel.findUserById(authorId);
        if (!author) {
            return res.status(400).json({ message: 'Nie znaleziono autora.' });
        }

        const newPost = await postModel.createPost(title, content, authorId, author.username);
        res.status(201).json({ message: 'Post utworzony pomyślnie.', post: newPost });
    } catch (error) {
        console.error('Błąd podczas tworzenia posta:', error);
        res.status(500).json({ message: 'Błąd serwera podczas tworzenia posta.' });
    }
}

async function updatePost(req, res) {
    const { id } = req.params;
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
        return res.status(400).json({ message: 'Tytuł, treść i ID użytkownika są wymagane.' });
    }
    try {
        const updatedPost = await postModel.updatePost(id, userId, title, content);
        if (!updatedPost) {
            return res.status(404).json({ message: 'Nie znaleziono posta lub nie jesteś właścicielem.' });
        }
        res.status(200).json({ message: 'Post zaktualizowany pomyślnie.', post: updatedPost });
    } catch (error) {
        console.error('Błąd podczas aktualizacji posta:', error);
        res.status(500).json({ message: 'Błąd serwera podczas aktualizacji posta.' });
    }
}

async function deletePost(req, res) {
    const { id } = req.params;
    const { userId } = req.body;
    if (!userId) {
        return res.status(400).json({ message: 'ID użytkownika jest wymagane.' });
    }
    try {
        const deletedCount = await postModel.deletePost(id, userId);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Nie znaleziono posta lub nie jesteś właścicielem.' });
        }
        res.status(200).json({ message: 'Post usunięty pomyślnie.' });
    } catch (error) {
        console.error('Błąd podczas usuwania posta:', error);
        res.status(500).json({ message: 'Błąd serwera podczas usuwania posta.' });
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
};