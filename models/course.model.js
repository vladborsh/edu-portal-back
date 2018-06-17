var mongoose = require('mongoose');
var GroupSchema = require('./group.model').sсhema;
var Schema = mongoose.Schema;

var CourseSchema = new Schema({
	title: {
		type : String
	},
	groups: {
		type : [GroupSchema]
	},
	status: { 
		type: String
    },
	createdDate : {
		type: Date
	}
});

module.exports.sсhema = CourseSchema;
module.exports.model = mongoose.model('Course', CourseSchema);