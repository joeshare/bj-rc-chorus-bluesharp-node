var express = require('express');
var router = express.Router();
var relationModelServer = require('../server/relationModelServer');

router.post('/api/relationmodel/createrelation', function(req, res, next) {
  relationModelServer.createRelation(req, res, next);
});
router.post('/api/relationmodel/saverelationinfo', function(req, res, next) {
  relationModelServer.saveRelationInfo(req, res, next);
});
router.post('/api/relationmodel/getrelationinfo', function(req, res, next) {
  relationModelServer.getRelationInfo(req, res, next);
});
router.post('/api/relationmodel/getrelationlist', function(req, res, next) {
  relationModelServer.getRelationList(req, res, next);
});
router.post('/api/relationmodel/getallentities', function(req, res, next) {
  relationModelServer.getAllEntities(req, res, next);
});
router.post('/api/relationmodel/getentitytypelist', function(req, res, next) {
  entityModelServer.getEntityTypeList(req, res, next);
});
router.post('/api/relationmodel/getdatatypelist', function(req, res, next) {
  relationModelServer.getDataTypeList(req, res, next);
});


module.exports = router;
