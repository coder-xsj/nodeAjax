var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/first', function (req, res) {
  res.send('Hello Ajax');

});


module.exports = router;
