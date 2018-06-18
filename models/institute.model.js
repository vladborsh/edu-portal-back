var mongoose = require('mongoose');
var GroupSchema = require('./group.model').sсhema;
var Schema = mongoose.Schema;

var InstituteSchema = new Schema({
	title: {
		type : String,
		unique: true
	},
	status: { 
		type: String
    },
	groups: {
		type : [GroupSchema]
	},
	createdDate : {
		type: Date
	}
});

module.exports.sсhema = InstituteSchema;
module.exports.model = mongoose.model('Institute', InstituteSchema);