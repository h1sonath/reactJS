const express = require('express');
const ReceiptRouter = express.Router();
const ReceiptModel = require('../models/receiptModel');

ReceiptRouter.get("/:id", async (req, res) => {
    let receiptId = req.params.id;
    try {
        const receiptFound = await ReceiptModel.findById(receiptId).populate("staff").exec();
        if (!receiptFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            res.json({ success: 1, receipt: receiptFound });
        }
    }
    catch (error) {
        res.status(500).json({ success: 0, error: error });
    }
});

ReceiptRouter.get("/", async (req, res) => {
    try {
        const receipts = await ReceiptModel.find({}, "staff unit payday").populate("staff").exec();
        res.json({ success: 1, receipts })
    }
    catch{
        res.status(500).json({ success: 0, error: error })
    }

    // .then(receipts => res.json({ success: 1, receipts }))
    // .catch(err => res.status(500).json({ success: 0, error: err }))
});

ReceiptRouter.post("/", async (req, res) => {
    const {  staff, unit, payday } = req.body;
    console.log(req.body);
    try {
        const receiptCreated = await ReceiptModel.create({  staff, unit, payday });
        res.status(201).json({ success: 1, receipt: receiptCreated })
    }

    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

ReceiptRouter.put("/:id", async (req, res) => {
    let receiptId = req.params.id;
    const {  staff, unit, payday } = req.body;
    // ReceiptModel.findById(receiptId, (err, receiptFound) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else if (!receiptFound) res.status(404).json({ success: 0, message: "Not Found" })
    //     else {
    //         for(key in { name, password, avatar, intro, posts }) {
    //             if(receiptFound[key] && req.body[key]) receiptFound[key] = req.body[key];
    //         }
    //         receiptFound.save((err, receiptUpdated) => {
    //             if (err) res.status(500).json({ success: 0, message: err })
    //             else res.status(201).json({ success: 1, receipt: receiptUpdated })
    //         })
    //     }
    // })
    try {
        const receiptFound = await ReceiptModel.findById(receiptId);
        if (!receiptFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in {   staff, unit, payday }) {
              if (receiptFound[key] && req.body[key]) receiptFound[key] = req.body[key];
            }
            let receiptUpdated = await receiptFound.save();
            res.json({ success: 1, receipt: receiptUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error });
    }
});

ReceiptRouter.delete("/:id", async (req, res) => {
    let receiptId = req.params.id;
    try {
        await ReceiptModel.findByIdAndRemove(receiptId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

module.exports = ReceiptRouter;