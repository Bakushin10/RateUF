var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    name: String,
    review:[{
        overallExpe: Number,
        levelOfDiffculty: Number,
        communicationOfIdeas: Number,
        facilitationOfLearning: Number,
        howIsTheProfessor: Array,
        wouldTakeAgain: String,
        extraComment: String,
        courseTakenFor : String,
        tipsForSuccess : Array,
        thumbsUp : Number,
        thumbsDown: Number
    }]
});

module.exports = mongoose.model('MATH_Review', ReviewSchema);
