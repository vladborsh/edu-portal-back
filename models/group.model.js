var mongoose = require('mongoose');
var UserSchema = require('./user.model').sсhema;
var SpecialitySchema = require('./speciality.model').sсhema;
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	title: {
		type : String
	},
	users: {
		type : [UserSchema]
	},
    speciality: {
        type: String
    },
    institute: {
        type: String
    },
	createdDate : {
		type: Date
	}
});

module.exports.sсhema = GroupSchema;
module.exports.model = mongoose.model('Group', GroupSchema);