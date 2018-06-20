var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarkSchema = new Schema({
	mark: {
		type : Number
	},
	date: {
		type : Date
	},
})

var JournalRowSchema = new Schema({
	_student: {
		type: mongoose.Schema.Types.ObjectId, ref: 'User'
	},
	marks: {
		type : [{type: mongoose.Schema.Types.ObjectId, ref: 'Mark'}]
	}
})

var JournalSchema = new Schema({
	_subject: {
		type: mongoose.Schema.Types.ObjectId, ref: 'Subject'
	},
	journalRows: {
		type : [{type: mongoose.Schema.Types.ObjectId, ref: 'JournalRow'}]
	}
})

var GroupSchema = new Schema({
	title: {
		type : String
	},
	journals: {
		type : [{type: mongoose.Schema.Types.ObjectId, ref: 'Journal'}]
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

module.exports.JournalSchema = JournalSchema;
module.exports.JournalModel = mongoose.model('Journal', JournalSchema);

module.exports.JournalRowSchema = JournalRowSchema;
module.exports.JournalRowModel = mongoose.model('JournalRow', JournalRowSchema);

module.exports.MarkSchema = MarkSchema;
module.exports.MarkModel = mongoose.model('Mark', MarkSchema);