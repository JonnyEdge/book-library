const User = require('../models/usersmodel');

exports.createUser = (request, response) => {
  const user = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
  });

  user.save().then(() => {
    response.status(201).json(user);
  });
};

module.exports = exports;
