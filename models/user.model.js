var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new Schema({
  password: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  birthdate: {
    type: Date
  },
  address: {
    type: String
  },
  role: {
    type: String,
    enum: ["Admin", "Teacher", "Student"]
  },
  course: {
    type: String
  },
  institute: {
    type: String
  },
  speciality: {
    type: String
  },
  group: {
    type: String
  },
  verificationCode: {
    type: String
  },
  createdDate: {
    type: Date
  },
  admissionDate: {
    type: Date
  },
  educationForm: {
    type: String
  },
  isBudget: {
    type: Boolean
  },
});

UserSchema.pre("save", function(next) {
  var user = this;
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports.sсhema = UserSchema;
module.exports.model = mongoose.model("User", UserSchema);
