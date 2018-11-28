const express = require('express');
const RoomRouter = express.Router();
const RoomModel = require('../models/roomModel');


// RoomRouter.use((req, res, next) => {
//     console.log("room middleware");
//     next();
// });

RoomRouter.get("/:id", async (req, res) => {
    let roomId = req.params.id;
    try {
        const roomFound = await RoomModel.findById(roomId);
        if (!roomFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            res.json({ success: 1, room: roomFound });
        }
    }
    catch (error) {
        res.status(500).json({ success: 0, error: error });
    }
});


RoomRouter.get("/", async (req, res) => {
    try {
        const rooms = await RoomModel.find({}, "name cost available");
        res.json({ success: 1, rooms })
    }
    catch{
        res.status(500).json({ success: 0, error: error })
    }

    // .then(rooms => res.json({ success: 1, rooms }))
    // .catch(err => res.status(500).json({ success: 0, error: err }))
});

RoomRouter.post("/", async (req, res) => {
    const { name, cost, available } = req.body;
    console.log(req.body);

    try {
        const roomCreated = await RoomModel.create({ name, cost, available });
        res.status(201).json({ success: 1, room: roomCreated })
    }

    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

RoomRouter.put("/:id", async (req, res) => {
    let roomId = req.params.id;
    const { name, cost, available } = req.body;

    try {
        const roomFound = await RoomModel.findById(roomId);
        if (!roomFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in { name, cost, available }) {
                if (roomFound[key] && req.body[key]) roomFound[key] = req.body[key];
            }
            let roomUpdated = await roomFound.save();
            res.json({ success: 1, room: roomUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error });
    }
});

RoomRouter.delete("/:id", async (req, res) => {
    let roomId = req.params.id;
    try {
        await RoomModel.findByIdAndRemove(roomId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

module.exports = RoomRouter;