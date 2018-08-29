const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const rentalRoutes = require('./routes/rentals');

const rental = require('./models/rental');
const FakeDB = require('./fake-db');


mongoose.connect(config.DB_URI,{useNewUrlParser: true})
.then(() => {
    const fakeDb = new FakeDB(); 
    fakeDb.seedDb();
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api/v1/rentals',rentalRoutes);

// app.get("/rental", (req, res) => {
//     res.json({"success": true});
// });

app.listen(PORT, () => {
    console.log(`Running at port: ${PORT}`);
});