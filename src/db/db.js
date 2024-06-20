const mongoose = require('mongoose');
 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ashishchaursiya:Sjn4LHWj7hS5wXwn@propertyjaipur.ttoxrmg.mongodb.net/PropertyJaipur');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

const getDB = () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('MongoDB connection not established');
  }
  return mongoose.connection.db;
};

module.exports = { connectDB, getDB };
