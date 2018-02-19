var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfSchema = new Schema({
    name: String,
    major: String,
    review:[{
        overallExpe: Number,
        levelOfDiffculty: Number,
        communicationOfIdeas: Number,
        facilitationOfLearning: Number,
        wouldTakeAgain: String,
        extraComment: String
    }],
    classes:[{
        overallExpe: Number,
        levelOfDiffculty: Number,
        knowBeforeCourse: String,
        extraComment: String
    }]
});

module.exports = mongoose.model('MATH_Prof', ProfSchema);