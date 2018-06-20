var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var GroupSchema = require('./group.model').sсhema;
var SubjectSchema = require('./subject.model').sсhema;

var SchedulingSchema = new Schema({
    _group: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Group'
    },
	_subject: { 
		type: mongoose.Schema.Types.ObjectId, ref: 'Subject'
    },
	weekDay: { 
		type: Number
    },
	orderNumber: { 
		type: Number
    },
	createdDate: { 
		type: Date
    }
});

module.exports.sсhema = SchedulingSchema;
module.exports.model = mongoose.model('Scheduling', SchedulingSchema);