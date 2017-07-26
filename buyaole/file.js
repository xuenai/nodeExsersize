var fs = require('fs');

var file = function(){
	fs.readFile('test.txt',function(err,data){
		if(err) return;
		console.log(data.toString());
	})
}
module.exports = file;