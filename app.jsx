const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const mysql = require("mysql");
const path = require('path');
const app = express();
const port = process.env.PORT || 65002;

require('dotenv').config();

const corsOptions = {
    origin: ['https://shopiee.hubsyntax.com'],
};

app.use(cors(corsOptions));
app.use(express.json());

const mysqlPool = mysql.createPool({
    user: "u880655869_Shopify_app",
    host: "srv691.hstgr.io",
    password: "Shopify@1234!",
    database: "u880655869_Shopify"
});

const mongoDBConnectionString = 'mongodb+srv://ranasahil78922:vnccqbcBi9BHvX6t@newproject.orfqpc7.mongodb.net/prodata?retryWrites=true&w=majority&appName=newproject';

mongoose.connect(mongoDBConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const mongoDB = mongoose.connection;

mongoDB.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoDB.once('open', () => {
    console.log('Connected to MongoDB');
});

const ShopifySchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    companyName: String,
    websiteUrl: String
});

const ShopifyModel = mongoose.model('data', ShopifySchema);

app.post('/register', async (req, res, next) => {
    try {
        console.log("Request Body:", req.body);
    
        var sql = "INSERT INTO shopifee (`first name`, `last name`, email, `phone number`, `company name`, `website url`) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.first,
            req.body.last,
            req.body.email,
            req.body.number,
            req.body.company,
            req.body.web,
        ];

        console.log("MySQL SQL Query:", sql);
        mysqlPool.query(sql, values, (mysqlErr, mysqlResult) => {
            if (mysqlErr) {
                console.error("MySQL Database Error:", mysqlErr);
                return res.status(500).json({ mysqlError: "Error in MySQL database operation", mysqlDetails: mysqlErr.message });
            }
            console.log("MySQL Database Result:", mysqlResult);
        });

        const newData = new ShopifyModel({
            firstName: req.body.first,
            lastName: req.body.last,
            email: req.body.email,
            phoneNumber: req.body.number,
            companyName: req.body.company,
            websiteUrl: req.body.web
        });
       
        const savedData = await newData.save();
        console.log("MongoDB Result:", savedData);
        return res.status(200).json({ status: "success" });
    } catch (error) {
        console.error("Catch Error:", error);
        return res.status(500).json({ error: "Error in database operation", details: error.message });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
