/**
 * Created by AnThen on 2017-3-17.
 */
var exports = module.exports = {};
var crypto = require("crypto");
var Agent = require("./agent.js");
var CONSTANT = require("../../config/constant.js");
var sessionAgent = require("../../utils/sessionAgent.js");
var loggerHelper = require("../../utils/loggerHelper.js");
var rsaconfig = require('../../config/rsaConfig');
var agent = new Agent(
    CONSTANT.caas.host,
    CONSTANT.caas.port,
    CONSTANT.caas.urlPrefix,
    CONSTANT.caas.appKey,
    CONSTANT.caas.appSecret
);
exports.login = function(req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);

    var logincount=3;
    req.body.password = rsaconfig.decrypt(req.body.password);
    req.body.login_name = rsaconfig.decrypt(req.body.login_name);

    if(!req.body.login_name||!req.body.password){
        res.send({
            code:CONSTANT.code.loginErr,
            msg:'missing login parameters'
        });
        return;
    }
    //crypto.createHash("md5").update(req.body.password).digest("hex"),

    function trylogin() {
        agent.login(
            req.body.login_name,
            req.body.password,
            req.body.vcode,
            xAuthToken,
            function(err, result) {
               // console.log('opopopop-----login');
                //err = true;
                if(!err && result.success) {
                    sessionAgent.setXAuthToken( req,result.xAuthToken)
                    _doAuth(result.auth_code, req, res);
                }else if(!err && !result.success){

                    res.send({code:result.errorCode,msg:result.errorMessage});
                } else {
                    logincount--;
                    if(logincount<=0){
                        res.send({
                            code:CONSTANT.code.loginErr,
                            msg:'login failure'
                        });
                    }
                    else
                    {
                        trylogin();
                    }
                }
            }
        );
    }

    trylogin();

}
exports.auth = function(req, res) {
    _doAuth(req.query.code, req, res);
}

exports.authByPost = function(req, res) {
    _doAuth(req.body.code, req, res);
}

/**
 *   batchCheckAuth 有获取资源功能，同时还有刷新auth_code 功能
 * @param req
 * @param res
 * @param callback
 */
exports.batchCheckAuth = function(req, res,callback) {
    var accessToken=req.session[CONSTANT.session.accessInfo].accessToken;
    agent.batchCheckAuth(accessToken, CONSTANT.accessArr, 'read',function(err, result){
        if(callback){
            callback(err, result)
        }else{
            if(!err) {
                if(result.success){
                    sessionAgent.setUserResource(req,result.resource_codes)
                    res.send({code:0,msg:"success",data:{token_refresh_flag:result.token_refresh_flag,resource_codes:result.resource_codes}});
                }else{
                    res.send({code:result.errorCode,msg:result.errorMessage});
                }
            } else {
                res.send({code:CONSTANT.code.err,msg:"batchCheckAuth failure"});
            }
        }

    })
}
function _doAuth(authCode, req, res) {
    agent.auth(authCode, function(err, result) {
        if(!err) {
            if(result.success){
                sessionAgent.setAccessInfo(req,result)
                require("async").parallel({
                    caasUserInfo : function(notice) {
                        agent.getUserInfo(result.access_token, function(err1, result1) {
                            notice(null,result1);
                        });
                    }
                }, function(asyncerr, results) {
                    if(!asyncerr){
                        var resJson=JSON.parse(JSON.stringify(results.caasUserInfo))
                        var code=0,msg="success";
                        try{
                            var  extentionInfo=JSON.parse(resJson.extinfo[0].extentionInfo);
                            sessionAgent.setUserInfo(req,resJson)
                            sessionAgent.setUserId(req,resJson.user_code)
                            sessionAgent.setUserName(req,resJson.user_name)
                            sessionAgent.setIpaUserInfo(req,extentionInfo)
                            console.log("-----------------",resJson)
                        }catch (e){
                            loggerHelper.logError(e)
                            code=CONSTANT.code.userInfoErr;
                            msg="user Info failure";
                        }
                        res.send({code:code,msg:msg});
                    }
                });
            }else{
                res.send({code:result.errorCode,msg:result.errorMessage});
            }

        } else{
            res.send({code:0,msg:"auth failure"});
        }
    });
}


exports.signup = function(req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);
    agent.signup(
        req.body.user_name,
        crypto.createHash("md5").update(req.body.password).digest("hex"),
        req.body.email,
        req.body.mobile,
        req.body.vcode,
        xAuthToken,
        function(err, result) {
            if(!err && result.success) {
                sessionAgent.setXAuthToken(req,result.xAuthToken)
                res.redirect("/login");
            } else {
                // ws.error(res);
            }
        }
    );
}



exports.base64Vcode = function(req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);
    agent.base64Vcode(xAuthToken, function(err, result) {
        if(!err) {
            sessionAgent.setXAuthToken(req,result.xAuthToken)
            // ws.ok(res, result.result);
        } else {
            //  ws.error(res);
        }
    });
}

exports.validateUserName = function(req, res) {
    _doValidation("UserName", req.params.name, req, res);
}

exports.validateEmail = function(req, res) {
    _doValidation("Email", req.params.email, req, res);
}

exports.validateMobile = function(req, res) {
    _doValidation("Mobile", req.params.mobile, req, res);
}

exports.validateVcode = function(req, res) {
    _doValidation("Vcode", req.params.vcode, req, res);
}
function _batchCheckAuth(){

}
function _doValidation(type, value, req, res) {
    var xAuthToken = sessionAgent.getXAuthToken(req);;
    agent["validate" + type].call(agent, value, xAuthToken, function(err, result) {
        if(!err) {
            sessionAgent.setXAuthToken(req, result.xAuthToken);
            // ws.ok(res, result);
        } else {
            // ws.error(res);
        }
    });
}

exports.logout = function(req, res) {
    var accessToken = sessionAgent.getAccessInfo(req).accessToken;
    agent.logout(accessToken, function(err, result) {
        sessionAgent.setCurrentProjectInfo(req,null);
        sessionAgent.setUserId(req, null);
        if(!err) {
            if(result.success) {
                res.send({code:0,msg:'success'});
            }
        } else {
            res.send(result);
        }
    });
}

exports.authorise = function(req, res, next) {
    if(sessionAgent.getUserId(req)) {
        var accessToken =sessionAgent.getAccessInfo(req).accessToken;
        agent.checkAuth(accessToken, "/all", function(err, result) {
            if(!err && result.success) {
                next();
            } else {
                req.session.user = null;
                _toLogin();
            }
        });
    } else {
        _toLogin();
    }

    function _toLogin() {
        var url = "http://" + config.server.host + ":" + config.server.port + "/auth?code=";
        res.redirect("http://caas-user/login.html?redirect_uri=" + encodeURIComponent(url) + "&client_id=" + config.caas.appKey);
    }
}

//检查session
exports.checkSession=function(req, res, next){

    if(CONSTANT.appStatus=='debug'){
        next();
        return;
    }
    var path=req.path.toLowerCase();
    if(req.session&&sessionAgent.getUserId(req)){
        next();
    }else{
        res.send({code:CONSTANT.code.sessionOut, msg: 'session time out'})
    }
}
//检查访问权限
exports.checkAccess=function(req, res, next,resource){
    if(req.session&&sessionAgent.checkUserResource(req,resource)){
        next();
    }else{
        res.send({code:CONSTANT.code.accessErr, msg: 'access denied'})
    }
}

exports.getUserInfo=function(req, res, next){
    res.send({code:0, msg: 'success',data: {name:sessionAgent.getUserName(req),id:sessionAgent.getUserId(req)}})
}
exports.getIpaUserInfo=function(req, res, next){
    res.send({code:0, msg: 'success',data: sessionAgent.getIpaUserInfo(req)})
}