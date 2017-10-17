var express = require('express');
var router = express.Router();
var tagServer =require('../server/tagmanagementServer');

router.post('/api/tagmodel/taglist', function(req, res, next) {
    tagServer.taglist(req,res,next);
});

router.post('/api/tagmodel/addtag', function(req, res, next) {
    tagServer.addtag(req,res,next);
});

router.post('/api/tagmodel/addtagclass', function(req, res, next) {
    tagServer.addtagclass(req,res,next);
});

router.post('/api/tagmodel/gettagvalue', function(req, res, next) {
    tagServer.gettagvalue(req,res,next);
});

router.post('/api/tagmodel/addtagvalue', function(req, res, next) {
    tagServer.addtagvalue(req,res,next);
});

router.post('/api/tagmodel/droptagvalue', function(req, res, next) {
    tagServer.droptagvalue(req,res,next);
});

module.exports = router;
