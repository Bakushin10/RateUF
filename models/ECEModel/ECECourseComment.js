var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CourseCommentSchema = new Schema({
    coursename: String,
    comment:[{
        reviewID: String,
        comment: String
    }]
});

module.exports = mongoose.model('ECE_Course_Comment', CourseCommentSchema);