var mongoose = require('mongoose');
var UserSchema = require('./user.model').sсhema;
var SpecialitySchema = require('./speciality.model').sсhema;
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
	title: {
		type : String
	},
	users: {
		type : [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
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