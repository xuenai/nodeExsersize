var querystring = require('querystring');
var heh = require('url');

var router = function(req,res){

	var action = req.method,
		url = req.url,
		html = '<html><head><meta charset="utf-8"><title>NODE</title></head>' +
				  '<body>' +
				  '<form method="post" action="/myfile/vue">' +
				  '网站名： <input name="name"><br>' +
				  '网站 URL： <input name="url"><br>' +
				  '<input type="submit">' +
				  '</form>' +
				  '</body></html>';

	if(action == 'GET'){
		if(url == '/index/tt.html'){
			console.log(heh.parse(url,true));
			console.log(req.url);
			res.writeHead(200,{'Content-type':'text/html'});
			res.write(html);
			res.end();
		}
	}else if(action == 'POST'){
		if(url == '/myfile/vue'){
			var str = '';
			req.on('data',function(data){
				str += data;
			});
			req.on('end',function(){
				var obj = querystring.parse(str);
				res.writeHead(200,{'Content-type':'html'});
				res.write('    <html><head><meta charset="utf-8"><title>NODE</title></head>' +
						   '<body>' +
						   '网站名:<p>' + obj.name + '</p>' +
						   '网站 URL:<p>'+  obj.url  +'</p>' +
						   '</body></html>');
				res.end();
			})
		}
	}



}
module.exports = router;