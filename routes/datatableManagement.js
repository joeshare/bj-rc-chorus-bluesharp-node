var express = require('express');
var router = express.Router();
var datatableServer = require('../server/datatableServer');
//列表
router.post('/api/datatablemanagement/list', function(req, res, next) {
  datatableServer.list(req, res, next);
});

//基本信息
router.post('/api/datatablemanagement/baseinfo', function(req, res, next) {
  datatableServer.baseinfo(req, res, next);
});

//增加项目
router.post('/api/datatablemanagement/add', function(req, res, next) {
  datatableServer.add(req, res, next);
});

//属性信息
router.post('/api/datatablemanagement/propertylist', function(req, res, next) {
  datatableServer.propertylist(req, res, next);
});
//字段类型信息
router.post('/api/datatablemanagement/gethivetypes', function(req, res, next) {
  datatableServer.getHiveTypes(req, res, next);
});
module.exports = router;
