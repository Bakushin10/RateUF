var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoursePreviousProfSchema = new Schema({
    courseCode: String,
    courseName: String,
    ProfPreviouslyTaught:[{
        name: String
    }]
});

module.exports = mongoose.model('CS_CoursePreviousProf', CoursePreviousProfSchema);