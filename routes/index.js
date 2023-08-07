var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var items = [
    { "text": "1st Post." },
    { "text": "2nd Post." }
  ];
  res.render('index', {
    title: 'node app',
    items
  });
});

module.exports = router;
