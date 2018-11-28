const express = require('express');
const StaffRouter = express.Router();
const StaffModel = require('../models/staffModel');

StaffRouter.get("/:id", async (req, res) => {
    let staffId = req.params.id;
    try {
        const staffFound = await StaffModel.findById(staffId);
        if (!staffFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            res.json({ success: 1, staff: staffFound });
        }
    }
    catch (error) {
        res.status(500).json({ success: 0, error: error });
    }
});

StaffRouter.get("/", async (req, res) => {
    try {
        const staffs = await StaffModel.find({}, "name sex address phone");
        res.json({ success: 1, staffs })
    }
    catch{
        res.status(500).json({ success: 0, error: error })
    }

    // .then(staffs => res.json({ success: 1, staffs }))
    // .catch(err => res.status(500).json({ success: 0, error: err }))
});

StaffRouter.post("/", async (req, res) => {
    const {  name, sex, address, cusID, phone } = req.body;
    console.log(req.body);
    try {
        const staffCreated = await StaffModel.create({ name, sex, address, phone });
        res.status(201).json({ success: 1, staff: staffCreated })
    }

    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

StaffRouter.put("/:id", async (req, res) => {
    let staffId = req.params.id;
    const { name, sex, address, phone } = req.body;
    // StaffModel.findById(staffId, (err, staffFound) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else if (!staffFound) res.status(404).json({ success: 0, message: "Not Found" })
    //     else {
    //         for(key in { name, password, avatar, intro, posts }) {
    //             if(staffFound[key] && req.body[key]) staffFound[key] = req.body[key];
    //         }
    //         staffFound.save((err, staffUpdated) => {
    //             if (err) res.status(500).json({ success: 0, message: err })
    //             else res.status(201).json({ success: 1, staff: staffUpdated })
    //         })
    //     }
    // })
    try {
        const staffFound = await StaffModel.findById(staffId);
        if (!staffFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in {  name, sex, address, phone }) {
              if (staffFound[key] && req.body[key]) staffFound[key] = req.body[key];
            }
            let staffUpdated = await staffFound.save();
            res.json({ success: 1, staff: staffUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error });
    }
});

StaffRouter.delete("/:id", async (req, res) => {
    let staffId = req.params.id;
    try {
        await StaffModel.findByIdAndRemove(staffId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

module.exports = StaffRouter;