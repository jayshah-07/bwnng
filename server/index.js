const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/dev');
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require("./routes/bookings");

const rental = require('./models/rental');
const FakeDB = require('./fake-db');

mongoose.set('useCreateIndex', true);
mongoose.connect(config.DB_URI,{
    useNewUrlParser: true})
.then(() => {
    const fakeDb = new FakeDB(); 
    //fakeDb.seedDb();
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())

app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);


// app.get("/rental", (req, res) => {
//     res.json({"success": true});
// });

app.listen(PORT, () => {
    console.log(`Running at port: ${PORT}`);
});