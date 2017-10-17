/**
 * Created by AnThen on 2017-2-23.
 * 任务开发
 */
var httpClient = require('../utils/httpClient');
var appUtil = require('../utils/appUtil');
var CONSTANT = require('../config/constant');
var httClient = require('../utils/httpClient');
var sessionAgent = require('../utils/sessionAgent');
var fs = require('fs');
var defualtCfg = {
    url: CONSTANT.blueSharpRemoteHost + ":" + CONSTANT.blueSharpRemotePort ,
    method:'GET',
    contentType: 'application/json'
};
/**
 * 获取关系列表
 * @param req
 * @param res
 * @param next
 */
function getRelationList(req, res, next) {
   // res.send(appUtil.body2Json(JSON.stringify(taskMonitorMock.getList())))
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    var pageNum=req.body.pageNum;
    var pageSize=req.body.pageSize;
    opt.url += `/relationManage/getRelationList/${pageNum}/${pageSize}`;
    opt.data=Object.assign({}, req.body);
    console.log( opt.url)
    console.log(opt.data)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }

    }
    httClient(opt);
}
/**
 * 获取关系信息
 * @param req
 * @param res
 * @param next
 */
function getRelationInfo(req, res, next) {
    var opt = Object.assign({},defualtCfg,{method:'POST'})
    opt.url += `/relationManage/getRelationInfo/${req.body.relationId}`;
    console.log(opt.url)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }

    }
    httClient(opt);
}
/**
 * 保存（修改）关系信息
 * @param req
 * @param res
 * @param next
 */
function saveRelationInfo(req, res, next) {
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    opt.url += `/relationManage/saveRelationInfo`;
    opt.data=Object.assign({}, req.body);
    opt.data['userId']=sessionAgent.getUserId(req);
    opt.data['userName']=sessionAgent.getUserName(req);
    opt.data.propertyList=JSON.parse(opt.data.propertyList)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}
/**
 * 创建关系
 * @param req
 * @param res
 * @param next
 */
function createRelation(req, res, next){
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    opt.url += `/relationManage/createRelation`;
    opt.data=Object.assign({}, req.body);
    opt.data['userId']=sessionAgent.getUserId(req);
    opt.data['userName']=sessionAgent.getUserName(req);
    opt.data.propertyList=JSON.parse(opt.data.propertyList)
    console.log(opt.data)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}

/**
 * 获取实体列表，支持通过实体名称进行模糊查询
 * @param req
 * @param res
 * @param next
 */
function getAllEntities(req, res, next){
    var opt = Object.assign({},defualtCfg,{method:"POST"})
    opt.url += `/entityManage/getAllEntities/${req.body.projectCode}`;
    opt.data=Object.assign({}, req.body);
    console.log("----",opt.url)
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}


/**
 * 获取所有数据类型
 * @param req
 * @param res
 * @param next
 */
function getDataTypeList(req, res, next){
    var opt = Object.assign({},defualtCfg)
    opt.url += `/property/getDataTypeList`;
    opt.data=Object.assign({}, req.body);
    opt.callBack = function (error, response, body) {
        if(!error){
            res.send(appUtil.body2Json(body))
        }else{
            res.send(error)
        }
    }
    httClient(opt);
}
module.exports = {
    getRelationList,
    getRelationInfo,
    saveRelationInfo,
    createRelation,
    getAllEntities,
    getDataTypeList
}