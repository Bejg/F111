const userModel = require('../models/userModel');

async function registerUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Nazwa użytkownika i hasło są wymagane.' });
    }

    try {
        const existingUser = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(409).json({ message: 'Użytkownik o tej nazwie już istnieje.' });
        }

        const newUser = await userModel.createUser(username, password);
        res.status(201).json({ message: 'Użytkownik zarejestrowany pomyślnie.', user: { id: newUser._id, username: newUser.username } });
    } catch (error) {
        console.error('Błąd podczas rejestracji użytkownika:', error);
        res.status(500).json({ message: 'Błąd serwera podczas rejestracji.' });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Nazwa użytkownika i hasło są wymagane.' });
    }

    try {
        const user = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: 'Nieprawidłowe dane.' });
        }

        const isMatch = await userModel.comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Nieprawidłowe dane.' });
        }

        res.status(200).json({ message: 'Zalogowano pomyślnie.', user: { id: user._id, username: user.username } });
    } catch (error) {
        console.error('Błąd podczas logowania użytkownika:', error);
        res.status(500).json({ message: 'Błąd serwera podczas logowania.' });
    }
}

async function getUserById(req, res) {
    const { id } = req.params;
    try {
        const user = await userModel.findUserById(id);
        if (!user) {
            return res.status(404).json({ message: 'Nie znaleziono użytkownika.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(`Błąd podczas pobierania użytkownika o id ${id}:`, error);
        res.status(500).json({ message: 'Błąd serwera podczas pobierania użytkownika.' });
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserById
};