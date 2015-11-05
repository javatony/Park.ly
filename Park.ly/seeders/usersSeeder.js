var models = require("../models")
var bcrypt = require('bcrypt');
var faker = require('faker');

var numberOfUsers = 20;



for (var i = 0; i < numberOfUsers; i++){

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
