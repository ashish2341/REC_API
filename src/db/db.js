
const mongoose = require('mongoose');
const { MONGODB_URL } = require('../helper/config');

mongoose.connect(MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

 
