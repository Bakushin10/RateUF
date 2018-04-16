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
        extraComment: String,
        whoTookWith: String,
        thumbsUp : Number,
        thumbsDown: Number
    }]
});

module.exports = mongoose.model('CS_CourseReview', ReviewSchema);