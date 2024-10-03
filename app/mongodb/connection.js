const mongoose = require("mongoose");
const { MONGODB_SECRET } = require("../../config/Constants");
const checkAndCreateUsers = require("./CheckDefaultUser");

const MONGO_URL = `mongodb+srv://${MONGODB_SECRET.USER_NAME}:${MONGODB_SECRET.PASSWORD}@jobify.tgpcb.mongodb.net/`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);
        await checkAndCreateUsers();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
