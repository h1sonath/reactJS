const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name: { type: String, required: true, unique: true}, 
    cost: { type: Number, default: 0},
    available: { type: Boolean, default:true, required: true}

});


const RoomModel = mongoose.model("Room", RoomSchema);

module.exports = RoomModel;