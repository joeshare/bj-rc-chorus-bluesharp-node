//ResourceApplication
var express = require('express');
var router = express.Router();
var qvServer = require('../server/queryVisualizationServer');
//保存接口
router.post('/api/queryvisualization/save', function(req, res, next) {
    qvServer.save(req, res, next);
});
//快照接口
router.post('/api/queryvisualization/getsnap', function(req, res, next) {
    qvServer.getsnap(req, res, next);
});
//实体下来框数据查询接口
router.post('/api/queryvisualization/queryentityselect', function(req, res, next) {
    qvServer.queryEntitySelect(req, res, next);
});
//关系下来框数据查询接口
router.post('/api/queryvisualization/queryrelationselect', function(req, res, next) {
    qvServer.queryRelationSelect(req, res, next);
});

//属性下来框数据查询接口
router.post('/api/queryvisualization/propertyselectlist', function(req, res, next) {
    qvServer.propertyselectlist(req, res, next);
});

//操作符下来框数据查询接口
router.post('/api/queryvisualization/operatorlistbytype', function(req, res, next) {
    qvServer.operatorlistbytype(req, res, next);
});
//chart数据查询接口
router.post('/api/queryvisualization/querydatachart', function(req, res, next) {
    qvServer.queryDataChart(req, res, next);
});
module.exports = router;