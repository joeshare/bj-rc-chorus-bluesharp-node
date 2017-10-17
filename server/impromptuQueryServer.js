/**
 * Created by AnThen on 2017-2-23.
 * 即席查询服务
 */
var sessionagant = require('../utils/sessionAgent');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var defualtCfg={
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/sqlQuery',
        contentType:'application/json',
        userid:0
};

/**
 *树型结构接口
 * @param req
 * @param res
 * @param next
 */
function getTree(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/listTable/'+sessionagant.getUserId(req);
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

/**
 *执行结果
 * @param req
 * @param res
 * @param next
 */
function result(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/queryResult/${sessionagant.getUserName(req)}/${req.body.pageNum}/${req.body.pageSize}`;
    delete req.body.pageNum;
    delete req.body.pageSize;
    opt.data=req.body;
    opt.data.currentProjectCode = sessionagant.getCurrentProjectInfo(req).projectCode;
    
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}

/**
 *执行历史
 * @param req
 * @param res
 * @param next
 */
function hestory(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/listHistory/'+sessionagant.getUserName(req)+'/'+req.body.pageNum+'/'+req.body.pageSize;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httpClient(opt);
}


module.exports = {
    getTree: getTree,
    result: result,
    hestory:hestory
}