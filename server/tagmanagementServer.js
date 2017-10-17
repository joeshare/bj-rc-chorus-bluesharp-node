/**
 * Created by AnThen on 2017-2-23.
 * 标签模型服务
 */
var sessionagant = require('../utils/sessionAgent');
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');

var defualtCfg={
        url:CONSTANT.blueSharpRemoteHost+":"+CONSTANT.blueSharpRemotePort+'/tagManage',
        contentType:'application/json'
};

/**
 *获取项目标签分类列表
 * @param req
 * @param res
 * @param next
 */
function taglist(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/getTagList`;
    opt.data=req.body;
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
 *标签分类列表添加分类
 * @param req
 * @param res
 * @param next
 */
function addtagclass(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/addTagClassify`;
    opt.data=req.body;
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
 *添加标签
 * @param req
 * @param res
 * @param next
 */
function addtag(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/addTag`;
    opt.data=req.body;
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
 *获取标签值列表
 * @param req
 * @param res
 * @param next
 */
function gettagvalue(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/getTagValueList/${req.body.pageNum}/${req.body.pageSize}`;
    delete req.body.pageNum;
    delete req.body.pageSize;
    opt.data=req.body;
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
 *新建标签值
 * @param req
 * @param res
 * @param next
 */
function addtagvalue(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/newTagValue`;
  //opt.data=req.body;
    opt.data= {'projectCode': req.body.projectCode, 'tagCode': req.body.tagCode,
        'tagValue': JSON.parse(req.body.tagValue)};

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
 *删除标签值
 * @param req
 * @param res
 * @param next
 */
function droptagvalue(req, res, next){
    defualtCfg.method="POST";
    var opt=appUtil.extend({},defualtCfg);
    opt.url+=`/dropTagValue`;
    opt.data=req.body;
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
    taglist: taglist,
    addtag: addtag,
    addtagclass:addtagclass,
    gettagvalue:gettagvalue,
    addtagvalue:addtagvalue,
    droptagvalue:droptagvalue
}