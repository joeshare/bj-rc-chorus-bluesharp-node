//ResourceApplication
var express = require('express');
var router = express.Router();
var qvServer = require('../server/queryVisualizationListServer');
//列表
router.post('/api/queryvisuallist/list', function(req, res, next) {
    qvServer.list(req, res, next);
});

module.exports = router;