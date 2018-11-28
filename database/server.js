const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const customerRouter = require('./routers/customerRouter');
const roomRouter = require('./routers/roomRouter');
const registrationRouter = require('./routers/registrationRouter');
const staffRouter = require('./routers/staffRouter');
const receiptRouter = require('./routers/receiptRouter');


mongoose.connect("mongodb://localhost/databaseproject", (err) => {
    if (err) console.log(err);
    else console.log("DB connect success")
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api/customers", customerRouter);

app.use("/api/rooms", roomRouter);

app.use("/api/registrations", registrationRouter);

app.use("/api/staffs", staffRouter);

app.use("/api/receipts", receiptRouter);


app.get('/api', (req, res) => {
    res.send("API router");
})
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/database.html")
})
app.get('/room', (req, res) => {
    res.sendFile(__dirname + "/public/Room.html")
})
app.get('/registration', (req, res) => {
    res.sendFile(__dirname + "/public/Registration.html")
})
app.get('/customer', (req, res) => {
    res.sendFile(__dirname + "/public/Customer.html")
})
app.get('/staff', (req, res) => {
    res.sendFile(__dirname + "/public/Staff.html")
})

const port = 6969;
app.listen(port, (err) => {
    if (err) console.log(err)
    else console.log("Listening at port 6969")
});