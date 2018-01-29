var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfSchema = new Schema({
  major: String,
  professor: [
      {name: {type:String}}
    ]
});

module.exports = mongoose.model('Professor', ProfSchema);
