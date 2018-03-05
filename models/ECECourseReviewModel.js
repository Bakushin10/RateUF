var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    courseCode: String,
    courseName: String,
    review:[{
        overallExpe: Number,
        levelOfDiffculty: Number,
        knowBeforeCourse: Array,
        howIsTheClass: Array,
        extraComment: String
    }]
});

module.exports = mongoose.model('ECE_CourseReview', ReviewSchema);
