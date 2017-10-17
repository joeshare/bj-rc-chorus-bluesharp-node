var express = require('express');
var router = express.Router();
var entityModelServer = require('../server/entityModelServer');

router.post('/api/entitymodel/createentity', function(req, res, next) {
  entityModelServer.createEntity(req, res, next);
});
router.post('/api/entitymodel/saveentityinfo', function(req, res, next) {
  entityModelServer.saveEntityInfo(req, res, next);
});
router.post('/api/entitymodel/getentityinfo', function(req, res, next) {
  entityModelServer.getEntityInfo(req, res, next);
});
router.post('/api/entitymodel/getentitylist', function(req, res, next) {
  entityModelServer.getEntityList(req, res, next);
});
router.post('/api/entitymodel/getallentities', function(req, res, next) {
  entityModelServer.getAllEntities(req, res, next);
});
router.post('/api/entitymodel/getentitytypelist', function(req, res, next) {
  entityModelServer.getEntityTypeList(req, res, next);
});
router.post('/api/entitymodel/getdatatypelist', function(req, res, next) {
  entityModelServer.getDataTypeList(req, res, next);
});


module.exports = router;
