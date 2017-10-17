/**
 * Author LLJ
 * Date 2016-7-14 16:08
 */
var fs = require('fs');
var log4js = require('log4js');
// 加载配置文件
var objConfig = JSON.parse(fs.readFileSync("log4js.json", "utf8"));
log4js.configure(objConfig);
var logInfo = log4js.getLogger('logInfo');
var logErr = log4js.getLogger('logErr');

module.exports = {
    logInfo: function (msg) {
        logInfo.info(msg);
    },
    logError: function (msg) {
        logErr.error(msg);
    },
    logDebug: function (msg) {
        console.debug(msg);
    }
};

