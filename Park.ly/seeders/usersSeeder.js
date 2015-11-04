var models = require("../models")
var bcrypt = require('bcrypt');
var faker = require('faker');




for (var i = 0; i < 5; i++){
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash("1234", salt, function(err, hash) {
        models.User.create({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          password: hash
        })
      });
  });
};
