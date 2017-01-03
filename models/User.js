var User = require('../lib/mongo').User;
module.exports={
	createUser:function(user){
		return User.create(user).exec();
	}
}