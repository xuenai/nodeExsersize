var mongoose = require('mongoose');
var UserSchema = require('../schema/user');

//创建model ， model才有数据库操作的能力

var User = mongoose.model('user',UserSchema);

//mongoose 真正创建的是users这个集合

module.exports = User