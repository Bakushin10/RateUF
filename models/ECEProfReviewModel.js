var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    name: String,
    review:[{
        overallExpe: Number,
        levelOfDiffculty: Number,
        communicationOfIdeas: Number,
        facilitationOfLearning: Number,
        wouldTakeAgain: String,
        extraComment: String
    }]
});

module.exports = mongoose.model('ECE_Review', ReviewSchema);
