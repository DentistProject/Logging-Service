const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loggingSchema = new Schema({
messageLog : {
    type: String,
    required: true,
},
});

module.exports = mongoose.model('Logging', loggingSchema);