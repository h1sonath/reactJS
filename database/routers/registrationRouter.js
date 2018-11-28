const express = require('express');
const RegistrationRouter = express.Router();
const RegistrationModel = require('../models/registrationModel');
const roomModel = require('../models/roomModel')

RegistrationRouter.get("/:id", async (req, res) => {
    let registrationId = req.params.id;
    try {
        const registrationFound = await RegistrationModel.findById(registrationId).populate("customer").populate("staff").populate("room").exec();
        if (!registrationFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            res.json({ success: 1, registration: registrationFound });
        }
    }
    catch (error) {
        res.status(500).json({ success: 0, error: error });
    }
});


RegistrationRouter.get("/", async (req, res) => {
    try {
        const registrations = await RegistrationModel.find({}, "customer room staff daycheckin daycheckout").populate("customer").populate("staff").populate("room").exec();
        res.json({ success: 1, registrations })
    }
    catch{
        res.status(500).json({ success: 0, error: error })
    }

    // .then(registrations => res.json({ success: 1, registrations }))
    // .catch(err => res.status(500).json({ success: 0, error: err }))
});

RegistrationRouter.post("/", async (req, res) => {
    const { customer, room, staff, daycheckin, daycheckout } = req.body;
    console.log(req.body);

    try {
        const registrationCreated = await RegistrationModel.create({ customer, room, staff, daycheckin, daycheckout });
        await roomModel.findByIdAndUpdate(room, { $set: { available: false } });
        res.status(201).json({ success: 1, registration: registrationCreated })
    }

    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

RegistrationRouter.put("/:id", async (req, res) => {
    let registrationId = req.params.id;
    const { customer, room, staff, daycheckin, daycheckout } = req.body;
    
    try {
        const registrationFound = await registrationModel.findById(registrationId);
        if (!registrationFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in { customer, room, staff, daycheckin, daycheckout }) {
                 if (registrationFound[key] && req.body[key]) registrationFound[key] = req.body[key];
            }
            let registrationUpdated = await registrationFound.save();
            res.json({ success: 1, registration: registrationUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error });
    }
});

RegistrationRouter.delete("/:id", async (req, res) => {
    let registrationId = req.params.id;
    try {
        await RegistrationModel.findByIdAndRemove(registrationId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

module.exports = RegistrationRouter;