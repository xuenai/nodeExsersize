var express = require('express'),
	bodyParser = require('body-parser');

var app = express();

app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

app.get('/',function(req,res){
	res.send('are you ok？');
});

app.get('/include',function(req,res){
	res.send('are you bad？');
});

app.get('/luyou',function(req,res){
	console.log(req.body);
	res.send('are you gg？');
});
console.log(5);
app.post('/',function(req,res){
	var obj = req.body;
	res.json(obj);
	res.send('x s b');
	console.log(obj);
});

app.listen(8090,function(){
	console.log('已启动服务器');
});