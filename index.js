require('dotenv').config();

const express = require('express');
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const { SERVER_CREDS } = require('./config/Constants');
const connectDB = require('./app/mongodb/connection');
const errorHandler = require('./middlewares/errorHandler');
const configureRoutes = require('./app/route');

connectDB()

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('combined'));

// Get the port from server credentials
const PORT = SERVER_CREDS.PORT_NUMBER || 5000;

configureRoutes(app)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}).on('error', (err) => {
    console.error(`Failed to start server: ${err.message}`);
});
