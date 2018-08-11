module.exports.ENV =
  (process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase()) ||
  (process.env.NODE_ENV = "development");
