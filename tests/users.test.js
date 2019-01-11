const mongoose = require('mongoose');
const User = require('../src/models/usersmodel');

describe('/users', () => {
  beforeEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('POST /users', () => {
    it('creates a new user in the database', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Wimbledon',
          lastName: 'Phuck',
          email: 'wimbledon.phuck@aol.com',
          password: 'phuckyeah',
        })
        .end((error, response) => {
          expect(error).to.equal(null);
          expect(response.status).to.equal(201);

          User.findById(response.body._id, (error, user) => {
            expect(error).to.equal(null);
            expect(user.firstName).to.equal('Wimbledon');
            expect(user.lastName).to.equal('Phuck');
            expect(user.email).to.equal('wimbledon.phuck@aol.com');
            // expect(user.password).to.not.equal('phuckyeah');
            expect(user.password).to.have.lengthOf(60);
            expect(response.body).to.not.have.property('password');
            done();
          });
        });
    });

    it('throws an error when an invalid email address is entered', (done) => {
      chai.request(server)
        .post('/users')
        .send({
          firstName: 'Wimbledon',
          lastName: 'Phuck',
          email: 'wimbledon.phuckataoldotcom',
          password: 'phuckyeah',
        })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.errors.email).to.equal('Invalid email address entered.');
          
          User.countDocuments((error, count) => {
            expect(count).to.equal(0);
          });

          done();
        });
    });
  });
});
