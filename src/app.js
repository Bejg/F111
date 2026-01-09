const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter'); 

const app = express();

app.use(cors()); 
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

module.exports = app;