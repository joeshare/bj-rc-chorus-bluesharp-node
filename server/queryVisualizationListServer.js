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


function list(req, res, next){
//entityManage/getEntitySelectList/{projectCode}
    var opt=appUtil.extend({},defualtCfg)

    opt.url += `/property/getRuleList/${req.body.pageNum}/${req.body.pageSize}`;
    opt.method="POST";
    delete req.body.pageNum;
    delete req.body.pageSize;
    opt.data=req.body;
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
    list: list
}