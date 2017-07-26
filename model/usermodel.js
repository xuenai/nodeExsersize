var mongoose = require('mongoose');
var schema = require('../schema/userschema');

var User = mongoose.model('user',schema);

module.exports = User;
