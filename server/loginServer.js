/**
 * Created by AnThen on 2017-2-23.
 */

var authInterface = require('../modules/authIntegration/AuthenticationInterface.js');
module.exports = {
    login:authInterface.login,
    logout:authInterface.logout
}