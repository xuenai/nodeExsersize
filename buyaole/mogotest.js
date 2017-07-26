var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser'); 

var app = express();

app.listen(8090,function(){
	console.log('服务器已启动');
});

mongoose.connect('mongodb://localhost/database2');

var db = mongoose.connection;

db.on('open',function(){
	console.log('数据库连接成功！');
});

var kittySchema = mongoose.Schema({
	age:Number,
	name:String
});

var User = mongoose.model('user',kittySchema);

app.get('/',function(req,res){
	var u = new User({
		name:'xuenai',
		age:20
	});

	u.save(function(err,doc){
		if(err){
			console.log('保存失败');
			res.json({code:0,msg:'错误'});
			return;
		};
		res.json({code:1,mgs:'ok'});
	});
})

