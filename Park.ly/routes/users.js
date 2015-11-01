var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
   res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
   next();
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

router.post('/login', function(req, res, next){
  console.log(req)
  res.json(req.body);
})

