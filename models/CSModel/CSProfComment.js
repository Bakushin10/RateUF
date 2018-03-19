var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfCommentSchema = new Schema({
    name: String,
    comment:[{
        reviewID: String,
        comment: String
    }]
});

module.exports = mongoose.model('CS_Prof_Comment', ProfCommentSchema);