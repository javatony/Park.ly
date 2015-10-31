var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {

  models.User.findAll({
    include: [ models.Spot ]
  }).then(function(users) {
    // console.log(users)
    // console.log(users[0].Spots)
    res.render('index', {
      title: 'Express',
      users: users
    });
  });

    // res.render('index', { title: 'Hello' })

  // console.log(data)
  // model.User.create
});

module.exports = router;
