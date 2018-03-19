var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoursePreviousProfSchema = new Schema({
    courseCode: String,
    courseName: String,
    ProfPreviouslyTaught:[{
        name: String,
        major: String
    }]
});

module.exports = mongoose.model('MATH_CoursePreviousProf', CoursePreviousProfSchema);