var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassSchema = new Schema({
    courseCode: String,
    courseName: String,
    major: String
});

module.exports = mongoose.model('MATH_Class', ClassSchema);