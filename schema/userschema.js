var mongoose = require('mongoose');

var schema = mongoose.Schema({
	username:String,
	password:Number
});

module.exports = schema;