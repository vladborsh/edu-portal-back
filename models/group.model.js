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
	status: { 
		type: String
    },
    speciality: {
        type: SpecialitySchema
    },
	createdDate : {
		type: Date
	}
});

module.exports.sсhema = GroupSchema;
module.exports.model = mongoose.model('Group', GroupSchema);