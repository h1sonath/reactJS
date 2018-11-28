const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true},
    sex: { type: String },
    phone: { type: String}
});

const CustomerModel = mongoose.model("Customer", CustomerSchema);

module.exports = CustomerModel;