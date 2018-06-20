var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SubjectSchema = new Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  teacherName: {
    type: String
  },
  _teacher: {
    type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  speciality: {
    type: String
  },
  group: {
    type: String
  },
  _group: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Group'
  },
  createdDate: {
    type: Date
  }
});

module.exports.sсhema = SubjectSchema;
module.exports.model = mongoose.model("Subject", SubjectSchema);
