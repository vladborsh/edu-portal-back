var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GroupSchema = require('./group.model').sсhema;
var SubjectSchema = require('./subject.model').sсhema;

var SchedulingSchema = new Schema({
    group: {
        type : GroupSchema
    },
	subject: { 
		type: SubjectSchema
    },
	date: { 
		type: String
    },
	orderNumber: { 
		type: Number
    },
	createdDate: { 
		type: SubjectSchema
    }
});

module.exports.sсhema = SchedulingSchema;
module.exports.model = mongoose.model('Scheduling', SchedulingSchema);