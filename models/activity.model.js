var mongoose = require('mongoose');
var UserSchema = require('./user.model').sсhema;
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	title: {
		type : String
	},
	user: {
		type : String
	},
	_user: {
		type : mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	lastName: {
		type : String
	},
	status: { 
		type: String
    },
    reward: {
        type: String
    },
	createdDate : {
		type: Date
	}
});

module.exports.sсhema = ActivitySchema;
module.exports.model = mongoose.model('Activity', ActivitySchema);