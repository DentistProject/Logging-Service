const Logging = require('../models/logging');

const getLoggings = async (req, res, next) => {
  try {
    const loggings = await Logging.find();
    res.json(loggings);
  } catch (err) {
    next(err);
  }
}

const createLogging = async (req, res, next) => {
  const logging = new Logging(req.body);

  try {
    await logging.save();
    res.status(201).json(logging);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getLoggings,
  createLogging,
};