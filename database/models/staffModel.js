const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StaffSchema = new Schema({
    name: { type: String, required: true },
    sex: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
});

const StaffModel = mongoose.model("Staff", StaffSchema);

module.exports = StaffModel;