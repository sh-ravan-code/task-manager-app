const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('========================================');
    console.log('🔍 Attempting to connect to MongoDB...');
    console.log('========================================');
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log('📍 Host:', conn.connection.host);
    console.log('📊 Database:', conn.connection.name);
    console.log('========================================');
    
  } catch (error) {
    console.error('========================================');
    console.error('❌ MongoDB Connection Error:');
    console.error('Error Message:', error.message);
    console.error('========================================');
    process.exit(1);
  }
};

module.exports = connectDB;
