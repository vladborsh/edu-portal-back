var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SpecialitySchema = new Schema({
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

module.exports.sсhema = SpecialitySchema;
module.exports.model = mongoose.model('Speciality', SpecialitySchema);