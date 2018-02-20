var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfPreviousCourseSchema = new Schema({
    name: String,
    major: String,
    coursePreviouslyTaught:[{
        courseCode: String,
        courseName: String,
    }]
});

module.exports = mongoose.model('ECE_ProfPreviousCourse', ProfPreviousCourseSchema);