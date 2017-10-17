var express = require('express');
var router = express.Router();
var loginServer = require('../server/loginServer');

/* POST api. */
router.post('/api/login/entry', function(req, res, next) {
  loginServer.login(req, res);
});
router.post('/api/logout', function(req, res, next) {
  loginServer.logout(req, res);
});

module.exports = router;
