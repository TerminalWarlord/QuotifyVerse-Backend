const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express()

app.use(express.json());
app.use(cors());

const getQuotes = require('./routes/quotes');
const adminRoutes = require('./routes/admin/manageQuotes');
const auth = require('./routes/auth');

app.use(getQuotes);
app.use(auth);
app.use(adminRoutes);



app.listen(3000, () => {
    mongoose.connect(process.env.MONGODB)
})