var express = require('express');
var router = express.Router();
var impromptuServer =require('../server/impromptuQueryServer');
var commonServer = require('../server/commonServer');

/* 树型结构接口 */
router.post('/api/impromptuquery/tree', function(req, res, next) {
    impromptuServer.getTree(req,res,next);
});
/* 执行结果 */
router.post('/api/impromptuquery/result', function(req, res, next) {
    impromptuServer.result(req,res,next);
});

/* 执行历史 */
router.post('/api/impromptuquery/hestory', function(req, res, next) {
    impromptuServer.hestory(req,res,next);
});

module.exports = router;
