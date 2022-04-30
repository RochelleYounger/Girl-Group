const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/motiv8_db',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
  }
);

module.exports = mongoose.connection;