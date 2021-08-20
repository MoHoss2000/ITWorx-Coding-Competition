var express = require('express');
const { login, resetPassword } = require('../controllers/user.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("HELLO FROM EXPRESS");
});

router.post('/login', login);
router.post('/reset-password', resetPassword);

module.exports = router;
