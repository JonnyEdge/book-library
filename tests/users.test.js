const mongoose = require('mongoose');
const User = require('../src/models/usersmodel');
const UserHelpers = require('../tests/helpers/users.helpers');
const DataFactory = require('../tests/helpers/data-factory');

describe('/users', () => {
  beforeEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
      const data = DataFactory.user();
      UserHelpers.signUp(data)
        .then((response) => {
          expect(data.firstName).to.not.equal('');
          expect(data.lastName).to.not.equal('');
          expect(data.email).to.not.equal('');
          expect(data.password).to.not.equal('');
          expect(response.body).to.not.have.property('password');
          done();
        })
        .catch((error) => done(error));
    });

    it('throws an error when an invalid email address is entered', (done) => {
      const data = DataFactory.user({ email: 'wimbledonphuckataoldotcom' });
      UserHelpers.signUp(data)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.errors.email).to.equal('Invalid email address entered.');

          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });

          done();
        })
        .catch((error) => done(error));
    });

    it('throws an error when an invalid password is entered', (done) => {
      const data = DataFactory.user({ password: 'phuckno' });
      UserHelpers.signUp(data)
        .then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.errors.password).to.equal('Password must be at least 8 characters long.');

          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });

          done();
        })
        .catch((error) => done(error));
    });
  });
});