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
            expect(user.password).to.equal('phuckyeah');
            done();
          });
        });
    });
  });
});
