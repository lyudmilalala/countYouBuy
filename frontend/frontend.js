var express = require('express');
var ejs = require('ejs');
var redis = require('redis');

function importData() {
    // var client = redis.createClient(30062, '0.0.0.0');
    var client = redis.createClient(6379, '10.103.91.216');
    
    client.on('connect', function () {
        console.log("Successfully connected to Redis.");
    });

    // client.monitor(function(err, res) {
    //     console.log(res);   // ok
    // });

    return new Promise(function (resolve,reject) {
        client.hgetall('history_count', function (err, data) {
            if (err) {
                reject(err);
            } else {
                // cannot JSON.parse here, need to return string
                data = JSON.stringify(data);
                client.quit();
                resolve(data);
            }
        });
    });
};

function startServer() {
    var app = express();
    // need ejs with engine to render html with dynamic json variables
    app.engine('html', ejs.__express);
    // absolute path, or app set views
    // app.set('views',__dirname)
    app.set('view engine', 'html');
    // use 'http://0.0.0.0:8081/static' points to local '/frontend/static'
    // first parameter the same as the one include in html
    app.use('/static', express.static('views/static'));

    importData().then(function(myDic){
        console.log('Get data successfully：' + myDic);
        myDic = JSON.parse(myDic);

        // render with data sent from backend
        // use ejs to set engine
        // ejs data in <%=KeyName%>, swig data in {{KeyName}}
        // javascript need to be written in HTML to use ejs/swig filter
        app.get('/dashboard', function (req, res, next) {
            var myLabels = [];
            var myData = [];
            for(var key in myDic){
                myLabels.push(key);
                myData.push(myDic[key]);
            }
            res.render("dashboard", {department: myLabels, count: myData});
        });

    }, function (reject) {
        console.log('Fail：' + reject);
    });
    
    var server = app.listen(8081, '0.0.0.0', function () {
        var host = server.address().address
        var port = server.address().port
        console.log("visit http://%s:%s", host, port)
    });
}

startServer();

