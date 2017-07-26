var express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	User = require('./model/usermodel');


mongoose.connect('mongodb://127.0.0.1:27017/user');
var db = mongoose.connection;

db.on('open',function(){
	console.log('数据库已连上');
})

var app = express();

app.use(express.static('static'));
app.use(express.static('pages'));
app.use(bodyParser.urlencoded({
	extended:true
}));


app.post('/api/register',function(req,res){
	let {username,password} = req.body;//{pwd:,username:}这里是密码是简写，下面是password全写，不能解构赋值成功
	// res.json([req.body,{username,password}]);
	User.find({username,password},function(err,doc){
		if(err){
			res.json({code:0,msg:'查找错误'});
			return;
		};
		if(doc.length){
			res.json({code:2,msg:'用户名已存在'});
		}else{
			var user = new User({username,password});
			user.save(function(err,doc){
				if(err){
					res.json({msg:'保存失败'});
					return;
				}
				// console.log(doc);
				res.json({code:1,msg:'用户名可以使用'});
			})
		}
	})	
});

app.post('/api/login',function(req,res){
	let {username,password} = req.body;
	User.find({username,password},function(err,doc){
		if(err){
			res.json({code:0,msg:'查找错误'});
			return;
		};
		if(doc.length){
			res.json({code:1,user:doc});
		}else{
			res.json({code:0,msg:'用户名或者密码错误'});
		}
	})
})

app.listen(8090,function(){
	console.log('服务器已启动');
});