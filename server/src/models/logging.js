const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loggingSchema = new Schema({
messageLog : {
    type: String
},
});

module.exports = mongoose.model('Logging', loggingSchema);