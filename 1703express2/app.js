var express = require("express");
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var app = express();
var upload = require('./util/upload');

var User = require("./model/user");
//链接数据库

mongoose.connect("mongodb://127.0.0.1:27017/1703mongo");

var db = mongoose.connection; //返回当前的数据库链接对象

db.on('open',function() {
	console.log("链接成功！")
});

app.use(express.static('pages')) //告诉express 静态资源放在那个路径下去了
app.use(express.static('uploadcache'))
//中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended: true
}))

app.get('/',function(req,res){
    res.send("你好！两位老师！"); //返回简单的字符串
})

app.get('/login',function(req,res){
    res.send("欢迎你！");
})

app.post('/login',function(req,res){
    //console.log(req.body.username);
    //查询数据库，是否存在这条记录
    let {username,pwd} = req.body; 

    User.find({username,pwd},function(err,doc){
       //console.log(doc)//这里返回的是一个数组。
       if (err) {
       	return
       };

       if (doc.length){
           res.json({code:0,user:doc[0]})
       }else{
       	   res.json({code:1,msg:"用户名/密码错误"});
       };

    })

    //res.json({msg:"你提交的数据是：" + req.body.username});//返回状态码200，并返回json对象给前端
})


//处理前端的注册

app.post('/api/regist',function(req,res){
    //console.log(req.body);
    let {username,pwd} = req.body; //对象的结构
    //数据库的操作了
     
    var user = new User({ //对象的简写 ES6 
    	username,
    	pwd
    })
    
    user.save(function(err,doc){
        if (err) {
        	res.json({msg:"保存失败！"})
        	return 
        };

        res.json({code:0,msg:"保存成功！"})
    })
})

//处理图片上传
app.post("/api/upload",function(req,res){
		upload.upload(req,res);
})

app.listen(8090,function(){
	console.log("启动成功！")
})