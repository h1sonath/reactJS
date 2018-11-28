const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReCeiptSchema = new Schema({
    staff: { type: Schema.Types.ObjectId, ref: "Staff"},
    unit: { type: Number},
    payday: { type: String}
});

const ReCeiptModel = mongoose.model("ReCeipt", ReCeiptSchema);

module.exports = ReCeiptModel;