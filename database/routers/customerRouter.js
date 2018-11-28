const express = require('express');
const CustomerRouter = express.Router();
const CustomerModel = require('../models/customerModel');

CustomerRouter.get("/:id", async (req, res) => {
    let customerId = req.params.id;
    try {
        const customerFound = await CustomerModel.findById(customerId);
        if (!customerFound) res.status(404).json({ success: 0, message: "Not Found" });
        else {
            res.json({ success: 1, customer: customerFound });
        }
    }
    catch (error) {
        res.status(500).json({ success: 0, error: error });
    }
});

CustomerRouter.get("/", async (req, res) => {
    try {
        const customers = await CustomerModel.find({}, "name sex address phone");
        res.json({ success: 1, customers })
    }
    
    catch{
        res.status(500).json({ success: 0, error: error })
    }
    
    // .then(customers => res.json({ success: 1, customers }))
    // .catch(err => res.status(500).json({ success: 0, error: err }))
});


CustomerRouter.post("/", async (req, res) => {
    const {  name, sex, address,  phone } = req.body;
    console.log(req.body);
    try {
        const customerCreated = await CustomerModel.create({ name, sex, address,phone });
        res.status(201).json({ success: 1, customer: customerCreated })
    }

    catch (err) {
        res.status(500).json({ success: 0, message: err });
    }
});

CustomerRouter.put("/:id", async (req, res) => {
    let customerId = req.params.id;
    const { name, sex, address, phone } = req.body;
    // CustomerModel.findById(customerId, (err, customerFound) => {
    //     if (err) res.status(500).json({ success: 0, message: err })
    //     else if (!customerFound) res.status(404).json({ success: 0, message: "Not Found" })
    //     else {
    //         for(key in { name, password, avatar, intro, posts }) {
    //             if(customerFound[key] && req.body[key]) customerFound[key] = req.body[key];
    //         }
    //         customerFound.save((err, customerUpdated) => {
    //             if (err) res.status(500).json({ success: 0, message: err })
    //             else res.status(201).json({ success: 1, customer: customerUpdated })
    //         })
    //     }
    // })
    try {
        const customerFound = await CustomerModel.findById(customerId);
        if (!customerFound) {
            res.status(404).json({ success: 0, message: "Not found" });
        } else {
            for (key in {  name, sex, address, phone }) {
              if (customerFound[key] && req.body[key]) customerFound[key] = req.body[key];
            }
            let customerUpdated = await customerFound.save();
            res.json({ success: 1, customer: customerUpdated });
        }
    } catch (error) {
        res.status(500).json({ success: 0, message: error });
    }
});

CustomerRouter.delete("/:id", async (req, res) => {
    let customerId = req.params.id;
    try {
        await CustomerModel.findByIdAndRemove(customerId);
        res.json({ success: 1 });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err })
    }
});

module.exports = CustomerRouter;