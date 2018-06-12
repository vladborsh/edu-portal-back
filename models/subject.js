var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
	title: {
		type : String
    },
    description: {
        type : String
    },
	status: { 
		type: String
    },
	createdDate : {
		type: Date
	}
});

module.exports.sсhema = SubjectSchema;
module.exports.model = mongoose.model('Subject', SubjectSchema);