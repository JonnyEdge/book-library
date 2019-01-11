const User = require('../models/usersmodel');

exports.createUser = (request, response) => {
  const user = new User({
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
  });

  user.save().then(() => {
    response.status(201).json(user.sanitise());
  })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        const emailError = error.errors.email ? error.errors.email.message : null;
        const passwordError = error.errors.password ? error.errors.password.message : null;
        response.status(400).json({
          errors: {
            email: emailError,
            password: passwordError,
          },
        });
      } else {
        response.sendStatus(500);
      }
    });
};

module.exports = exports;
