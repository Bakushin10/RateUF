var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfSchema = new Schema({
    name: String,
    major: String,
    overview : Number
});

module.exports = mongoose.model('CS_Prof', ProfSchema);
