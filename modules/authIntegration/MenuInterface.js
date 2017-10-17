/**
 * Created by AnThen on 2017-4-1.
 */
var authInterface = require("./AuthenticationInterface.js");
var CONSTANT = require("../../config/constant.js");
const defaultRootNode=['projectmanagement-module', 'dmp', 'marketing', 'insight'];
var sessionAgent = require("../../utils/sessionAgent.js");
var roleconfig = require('../../config/roleConfig');
const defaultMenus = {
    'projectmanagement-module': [{
        index:1,
        level: 1,
        parent: 'root',
        id: 'projectmanagement-module',
        'text': '项目管理',
        'url': '',
        'iconClass':'ion-archive',
        'collapse':false,
        active: false,
        children: [{
            level: 2,
            parent: 'projectmanagement-module',
            id: '/projectmanagement',
            active: false,
            'text': '项目管理',
            'url': '/projectmanagement',
            'collapse':false,
            'children': []
        }
        ]
    }],
    'datamodelmanagement-module': [{
        index:6,
        level: 1,
        parent: 'root',
        id: 'datamodelmanagement-module',
        text: '数据模型管理',
        active: false,
        'iconClass':'ion-paper-airplane',
        'url': '',
        'collapse':false,
        children: [
            {
                level: 2,
                parent: 'datamodelmanagement-module',
                id: '/entitymodel',
                text: '实体模型',
                active: false,
                'collapse':false,
                url:'/entitymodel'
            },
            {
                level: 2,
                parent: 'datamodelmanagement-module',
                id: '/relationmodel',
                text: '关系模型',
                active: false,
                'collapse':false,
                url:'/relationmodel'
            },
            {
                level: 2,
                parent: 'datamodelmanagement-module',
                id: '/tagmodel',
                text: '标签模型',
                active: false,
                'collapse':false,
                url:'/tagmodel'
            }
        ]
    }],
    'datagraphvisualization-module':[
        {
            index:7,
            level: 1,
            parent: 'root',
            id: 'datagraphvisualization-module',
            text: '数据图可视化',
            active: false,
            'iconClass':'ion-social-codepen-outline',
            'url': '',
            'collapse':false,
            children: [{
                    level: 2,
                    parent: 'datagraphvisualization-module',
                    id: '/queryvisualization',
                    text: '查询可视化',
                    active: false,
                    'collapse':false,
                    url:'/queryvisualization/desc/create/0'
                },
                {
                    level: 2,
                    parent: 'datagraphvisualization-module',
                    id: '/queryvisuallist',
                    text: '历史可视化规则',
                    active: false,
                    'collapse':false,
                    url:'/queryvisuallist'
                }

            ]}
    ]
}
function transformMenus(resource_codes){
    var moduleArr=[],pageArr=[],resMenus=[];
    if(resource_codes&&resource_codes.length){
        resource_codes.forEach(function(menu,i){
            if(menu.indexOf("-module")>0){
                moduleArr.push(menu);
            }else{
                pageArr.push(menu);
            }
        })
        var clone=JSON.parse(JSON.stringify(defaultMenus));
        moduleArr.forEach(function(moduleKey,i){
            var moduleData=clone[moduleKey];
            if(moduleData){
                var newMenu=moduleData[0].children.filter(function(subMenu,i){
                    return pageArr.indexOf(subMenu.id)>-1
                })
                moduleData[0].children=newMenu;
                resMenus.push(moduleData[0])
            }
        })
        resMenus = resMenus.sort(function(a, b) {
            var x = a['index']; var y = b['index'];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        return resMenus;
    }else{
        return resMenus;
    }
}
const resource_codes=["projectmanagement-module",
    "/projectmanagement",
    "datamodelmanagement-module",
    "/entitymodel",
    "/relationmodel",
    "/tagmodel",
    "datagraphvisualization-module",
    "/queryvisualization",
    "/queryvisuallist"
];
exports.getMenus = function(req, res) {
    if(CONSTANT.appStatus=="debug"){
        res.send({code:0,msg:"success",data:{token_refresh_flag:new Date().getTime(),resource_codes:CONSTANT.accessArr,menus:transformMenus(CONSTANT.accessArr)}});
        return;
    }
    console.log('----------------------------fa ',resource_codes)
    sessionAgent.setUserResource(req,resource_codes)
    res.send({code:0,msg:"success",data:{token_refresh_flag:"",resource_codes,menus:transformMenus(resource_codes)}})
}

