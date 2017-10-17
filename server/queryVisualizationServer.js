/**
 * Created by AnThen on 2017-8-7.
 */
var httpClient=require('../utils/httpClient');
var appUtil=require('../utils/appUtil');
var CONSTANT=require('../config/constant');
var httClient=require('../utils/httpClient');
var sessionagant = require('../utils/sessionAgent');
var defualtCfg={
    url:CONSTANT.blueSharpRemoteHost+":"+CONSTANT.blueSharpRemotePort,
    contentType:'application/json'
};

function save(req, res, next){
    var opt=appUtil.extend({},defualtCfg)
        //projectCode   ruleName
    opt.url+=`/property/saveSearchRule`;
    opt.method="POST";
    opt.data=req.body;
    opt.data.userId= sessionagant.getUserId(req);
    opt.data.userName= sessionagant.getUserName(req);

    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);
}

function getsnap(req, res, next){
    var opt=appUtil.extend({},defualtCfg)
    //projectCode   ruleName
    opt.url+=`/property/getRuleInfo/${req.body.id}`;
    opt.method="GET";
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);
}

function queryEntitySelect(req, res, next){
    var opt=appUtil.extend({},defualtCfg)

    if(req.body.relationId)
    {
        opt.url+=`/entityManage/getEntitySelectList/${req.body.projectCode}?relationId=${req.body.relationId}`;
    }
    else{
        opt.url+=`/entityManage/getEntitySelectList/${req.body.projectCode}`;
    }
    opt.method="GET";

    console.log('=----------------------',opt)
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);
}

function queryRelationSelect(req, res, next){
    var opt=appUtil.extend({},defualtCfg)

    opt.url+=`/relationManage/getRelationSelectList/${req.body.startEntityId}`;
    opt.method="GET";
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);

}

function operatorlistbytype(req, res, next){

    var opt=appUtil.extend({},defualtCfg)

    opt.url+=`/property/getOperatorListByType`;
    opt.method="POST";
    opt.data = req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);
}

function propertyselectlist(req, res, next) {

    var opt=appUtil.extend({},defualtCfg)

    opt.url+=`/property/getPropertySelectList`;

    opt.method="POST";
    opt.data = req.body;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);
}

function queryDataChart(req, res, next){
    var opt=appUtil.extend({},defualtCfg)
    opt.url+='/visualQueryList';
    opt.method="POST";
    let vertexId=100;
    function getcenterrec(centerVertex){
        return {
            "properties": [
                {
                    "name": "顶点ID",
                    "value":vertexId++,
                    "code": "id"
                },
                {
                    "name": "邮箱",
                    "value":`${(Math.random()/+new Date()).toString(36).replace(/\d/g,'').slice(1)}@163.com`,
                    "code": "email"
                }
            ],
            "statisticses": [
                {
                    "name": "顶点ID",
                    "value":  `${(Math.random()/+new Date()).toString(36).replace(/\d/g,'').slice(1)}`,
                    "code": "id"
                },
                {
                    "name": "顶点属性个数",
                    "value":  `${(Math.random()/+new Date()).toString(36).replace(/\d/g,'').slice(1)}`,
                    "code": "propertyCount"
                }
            ],
            "settings": [
                {
                    "name": "顶点ID",
                    "code": "id"
                },
                {
                    "name": "邮箱",
                    "code": "email"
                }
            ],
            "entityType": centerVertex?"userInfo":"students",
            centerVertex
        };
    }
    function vertexCenterOutputs(){
        let arr=[];
        while(arr.length<5){
            arr.push(getcenterrec(true))
        }
        return arr
    }
    function vertexOutputs(){
        let arr=[];
        while(arr.length<5){
            arr.push(getcenterrec(false))
        }
        return arr
    }
    let endVertexId=105;
    function getEdge(){
        return {
            "properties": [
                {
                    "name": "边ID",
                    "value":  `${(Math.random()/+new Date()).toString(36).replace(/\d/g,'').slice(1)}`,
                    "code": "id"
                },
                {
                    "name": "关系名称",
                    "value":  `${(Math.random()/+new Date()).toString(36).replace(/\d/g,'').slice(1)}@163.com`,
                    "code": "relationName"
                }
            ],
            "statisticses": [
                {
                    "name": "边ID",
                    "value": `${(Math.random()/+new Date()).toString(36).replace(/\d/g,'').slice(1)}`,
                    "code": "id"
                },
                {
                    "name": "边属性个数",
                    "value": "2",
                    "code": "propertyCount"
                }
            ],
            "settings": [
                {
                    "name": "边ID",
                    "code": "id"
                },
                {
                    "name": "关系名称",
                    "code": "relationName"
                }
            ],
            "relationtype": "userInfoRelation",
            "fromVertexId": 100,
            "endVertexId": endVertexId++
        }
    }
    function edgeOutputs(){
        let arr=[];
        while(arr.length<5){
            arr.push(getEdge())
        }
        return arr
    }
    res.send({
        "code": 0,
        "data": {
            "edgeOutputs": edgeOutputs(),
            "vertexOutputs": vertexCenterOutputs().concat(vertexOutputs())
        },
        "date": "2017-08-08",
        "msg": "success",
        "total": 1,
        "vertexCount": 2,
        "edgeCount": 1
    })
    //TODO::
    return;
    opt.callBack=function(error, response, body){
        if(error)
        {
            res.send(error);
        }
        else {
            res.send(appUtil.body2Json(body));
        }
    }
    httClient(opt);
}
module.exports = {
    getsnap:getsnap,
    save: save,
    queryEntitySelect: queryEntitySelect,
    queryRelationSelect:queryRelationSelect,
    queryDataChart:queryDataChart,
    operatorlistbytype:operatorlistbytype,
    propertyselectlist:propertyselectlist,
}