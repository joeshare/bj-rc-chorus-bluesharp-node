/**
 * Created by AnThen on 2017-2-23.
 * 项目管理服务
 */
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var loggerHelper=require('../utils/loggerHelper');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');
var sessionagant = require('../utils/sessionAgent');
var defualtCfg={
        url:CONSTANT.remoteHost+":"+CONSTANT.remotePort+'/table',
        contentType:'application/json'
};
/**
 * 列表数据
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next){
    defualtCfg.method="GET";
    //http://10.200.32.95:8080/projectinfo/get/u/0/1/10
    //POST /table/list/{projectId}/{pageNum}/{pageSize}
    var opt=appUtil.extend({},defualtCfg)
    var pageNum=req.body.pageNum;
    var pageSize=req.body.pageSize;
    var projectId=req.body.projectId;
    opt.url+=`/list/${projectId}/${pageNum}/${pageSize}`;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}
/**
 * 基本信息
 * @param req
 * @param res
 * @param next
 */
function baseinfo(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get_with_column/'+req.body.tableInfoId;  
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}
/**
 * 增加项目
 * @param req
 * @param res
 * @param next
 */
function add(req, res, next){
//create
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/create';
    opt.data=JSON.parse(req.body.objectval);
    opt.data.projectId = req.body.projectId;
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            res.send(JSON.parse(body));
        }
    }
    httClient(opt);
}
/**
 * 属性信息
 * @param req
 * @param res
 * @param next
 */
function propertylist(req, res, next){

}
/**
 * 字段类型
 * @param req
 * @param res
 * @param next
 */
function getHiveTypes(req, res, next){
    defualtCfg.method="GET";
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/get_hive_types';
    opt.callBack=function(error, response, body){
        if(error){
            res.send(error);
        }else {
            var _body=appUtil.body2Json(body);
            if(_body.code==0){
                var data=[],code=0;
                _body.data.forEach((b,i)=>{
                    data.push({
                        text: b,
                        value: b
                    })
                })
                res.send({code,data});
            }else{
                res.send({code:CONSTANT.code.dataErr,data:[]});
                loggerHelper.logError(JSON.stringify(_body))
            }

        }
    }
    httClient(opt);
}
module.exports = {
    list: list,
    baseinfo: baseinfo,
    add:add,
    propertylist:propertylist,
    getHiveTypes
}