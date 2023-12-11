const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./controllers/routes');


// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') })
//variables
const mongoURI = process.env.MONGODB_URI;
const port = process.env.PORT || 9090;
// Connect to MongoDB
mongoose.connect(mongoURI).catch(function (err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

const app = express()
const mqttClient = require('./mqtt');
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: env === 'development' ? err : {}
    });
});

app.use('/api', routes);
// Routes
//MQTT TEST
app.post("/send-mqtt", function(req, res) {
    mqttClient.sendMessage(req.body.message);
    res.status(200).send("Message sent to mqtt");
  });



app.listen(port, function (err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}`);
    console.log(`Backend: http://localhost:${port}/api/`);
});

module.exports.mongoose = mongoose;