var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).use(function(req, res){res.setHeader("Access-Control-Allow-Origin", "")}).listen(8080, function(){
    console.log('Server running on 8080...');
});
