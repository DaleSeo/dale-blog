var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Running');
});

router.get('/test', function(req, res, next) {
  res.send('<h1>Test</h1>');
});

module.exports = router;
