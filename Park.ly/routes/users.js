var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// User creation route
router.post('/new', function(req, res, next) {
  res.send('you are in route to create user');
});

// User profile route
router.get('/:id', function(req, res, next) {
  console.log(req.params.id)
  res.send('you are in '+ req.params.id);
});

// User delete route
router.delete('/:id', function(req, res, next){
  res.send('you are deleting user id ' + req.params.id)
})


// User login route
router.post('/login', function(req, res, next) {

  res.send('Run login process here');
});

// User logout route
router.get('/logout', function(req, res, next) {
  console.log(req.params.id)
  res.send("this route should log user out and redirect '/'");
});

module.exports = router;
