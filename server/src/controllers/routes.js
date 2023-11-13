const express = require('express')
const router = express.Router()

const  { 
    getLoggings,
    createLogging,
} = require('../controllers/loggings.js')

router.get('/v1/loggings', getLoggings)
router.post('/v1/loggings', createLogging)

module.exports = router;