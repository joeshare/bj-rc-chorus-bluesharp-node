/**
 * Created by AnThen on 2017-2-23.
 */
function registor(app) {
    console.log("router register")
   var requires = [
      '../routes/authentication.js',
      '../routes/index.js',
      '../routes/login.js',
      '../routes/resourceAllocation.js',
      '../routes/resourcesApplication.js',
      '../routes/projectInfo.js',
      '../routes/graphdatamanage.js',
      '../routes/dataChartQuery.js',
      '../routes/dataLaboratory.js', 
      '../routes/impromptuQuery.js',
      '../routes/externalResource.js',
      '../routes/taskDevelopment.js',
      '../routes/taskMonitor.js',
      '../routes/datatableManagement.js',
      '../routes/matedataManagement.js',
      '../routes/memberManagement.js',
      '../routes/dataaccessManagement.js',
      '../routes/dataComponentManagement.js',
      '../routes/entityModel.js',
      '../routes/relationModel.js',
      '../routes/tagManagement.js',
      '../routes/queryVisualization.js',
      '../routes/queryVisualizationList.js'
   ];

    requires.forEach(function(item, index) {
        app.use('/', require(item));
    });

}

module.exports = registor;