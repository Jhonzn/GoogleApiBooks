const mongoose = require("mongoose");

const uri = "mongodb+srv://BookAplication:aplicaciondelibros@cluster0.plnmdkz.mongodb.net/salasdb?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ DB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
