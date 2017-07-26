var http = require('http'),
	router = require('./router'),
	file = require('./file');
console.log('这是文件路径' + __dirname);
file();
http.createServer(function(req,res){
	router(req,res);
}).listen(8090);