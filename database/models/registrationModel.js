const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegistrationSchema = new Schema({
    customer: {  type: Schema.Types.ObjectId, ref: "Customer" },
    staff: {  type: Schema.Types.ObjectId, ref: "Staff"},
    room: {  type: Schema.Types.ObjectId, ref: "Room" },
    daycheckin : { type: String },
    daycheckout: { type: String}
});

const RegistrationModel = mongoose.model("Registration", RegistrationSchema);

module.exports = RegistrationModel;
















