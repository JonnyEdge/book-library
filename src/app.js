const express = require('express');
const usersController = require('./controllers/userscontroller');

const app = express();
app.use(express.json());
app.use('/users', usersController.createUser);

module.exports = app;
