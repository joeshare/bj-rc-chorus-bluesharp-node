/**
 * Created by AnThen on 2017-2-23.
 */
/**
 * Session存储内容属性
 */
module.exports = {
    appCode:49,

    appName:'chorusApp',
    appStatus:"deploy",//"development",//deploy
    resourcePath: "public",//public
    cookie: {
        identityKey: 'blueSharpApp',
        maxAge: 12 * 60 * 60 * 1000//24 * 60 * 60 * 1000
    },
    //chorus java
    remoteActionUrl:"http://10.200.48.106:8080",
    remoteHost:"http://10.200.48.106",
    remotePort:"8080",
    //蜂巢
    fenRemoteHost:"http://10.200.32.109",
    fenRemotePort:"8080",
    //blueSharp 10.200.32.14:8080
    blueSharpRemoteHost:"http://10.200.48.114",
    blueSharpRemotePort:"8080",
    redisHost:"10.200.48.108",
    redisPort:6379,//
    redisPassword:123456,
    raspublickey:"",
    rsaprivatekey:"",
    //https://caas-admin-test.cssrv.dataengine.com/api/v1/user/login
    caas: {
        host:"caas-test.in.dataengine.com",
        port: 80,
        urlPrefix: '/api/v1',
        appKey:"81fd5751b4384cd4b10891d69bb3c96b",
        appSecret:"6a4e24d535fc4fe1bcd0109acc20b087"
    },
    cassAdmin:{
        user:"chorus-ad-test@caas.rongcapital.cn",
        pwd:"1"
    },
    contentType: {
        'formData': 'multipart/form-data',
        'formUrlencoded': 'application/x-www-form-urlencoded',
        'applicationJson': 'application/json'
    },
    chorusAppId:49,
    chorusSubjectCode:10440,

    page: {
        //主页
        main: 'http://bluesharpweb.dataengine.com/',
        //登录页
        login: 'http://bluesharpweb.dataengine.com/login.html',
        //欢迎页
        welcome: 'http://bluesharpweb.dataengine.com/welcome.html'
    },
    session: {
        /**caas登录用户ID*/
        userId: '__USER_ID__',
        /**登录用户名称*/
        userName: '__USER_NAME__',
        /**登录时间 */
        loginTime: '__LOGIN_TIME__',
        /**登录次数*/
        loginCount: '__LOGIN_COUNT__',
        /**权限信息 caas
         {} accessToken : result.access_token,
         {} expiresIn : result.expires_in,
         {} refreshToken : result.refresh_token
         */
        accessInfo: '__AUTH_INFO__',
        /**ipa 用户信息  */
        ipaUserInfo: '__IPA_USER_INFO__',
        caasUserInfo: '__CAAS_USER_INFO__',
        xAuthToken: '__X_AUTH_TOKEN__',
        resourceCode: '__RESOURCE_CODE__',
        currentThemeCode:'__CURRENT_THEME_CODE__',
        currentProjectInfo:'__RESOURCE_PROJECT_INFO__'
    },
    //caas 管理员名称
    caasManagementUserName:'',
    //caas 管理员密码
    caasManagementUserPwd:'',
    //session模式 cluster集群/ 单点
    sessionMode:"development",//'cluster',//
    clusterDbAddress: [
        {
            port: 7000,
            host: '10.200.1.89'
        }, {
            port: 7000,
            host: '10.200.1.90'
        }, {
            port: 7000,
            host: '10.200.1.91'
        }, {
            port: 7001,
            host: '10.200.1.89'
        }, {
            port: 7001,
            host: '10.200.1.90'
        }, {
            port: 7001,
            host: '10.200.1.91'
        }],
    //白名单
    sessionWhiteList: [
        '/api/login/entry',
        '/api/getpublickey'
    ],
    accessWhiteList: [
        '/login',
        '/logout',
        '/getMenus',
        '/getUserInfo',
        '/getPublicKey',
        '/projectmanagement'
    ],
    //访问权限数组
    accessArr: [
        'projectmanagement-module',
        '/projectmanagement',
        '/membermanagement',
        '/resourceallocation',
        '/externalresource',
        'datamanagement-module',
        '/datatablemanagement',
        '/metadatamanagement',
        '/dataaccessmanagement',
        '/graphdatamanagement',
        'dataanalyse-module',
        '/impromptuquery',
        '/datachartquery',
        '/datalaboratory',
        'datadevelopment-module',
        '/taskdevelopment',
        '/taskmonitor',
        'platformmanagement-module',
        '/resourcesapplication',
        '/resourcesapplicationlist'
    ],
    //回数code
    code: {
        err: 8000,
        loginErr: 8001,
        sessionOut: 8002,
        accessErr: 8003,
        userInfoErr:8004,
        dataErr:8100
    }
};
