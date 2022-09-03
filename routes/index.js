var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Hello you have reached the empty home page of the app');
});

module.exports = router;