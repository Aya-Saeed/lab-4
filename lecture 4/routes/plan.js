const express = require("express");
const { Plan, validateplan } = require("../models/plan");
const mongoose=require("mongoose");
const auth=require("../middleware/auth")
const admin=require("../middleware/admin")

const router = express.Router()
//all user can see plan
router.get("/plans",auth, async (req, res) => {
    const plans = await Plan.find()
        // .populate("users", "name email -_id")
    res.json(plans)
})

router.get("/plans/:id",[auth,admin], async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "no plan with the given id" })
    const plans = await Plan.findById(req.params.id);
    res.json(plans)
})

router.post("/plans/add",[auth,admin], async (req, res) => {
    const { error } = validateplan(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message })
        const newPlan = new Plan(req.body)
        await newPlan.save()
        const plans =await Plan.find()
        res.json(plans)
});

router.put("/plans/:id", [auth,admin],async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({ message: "no plan with the given id" })
    const plans = await Plan.findById(req.params.id);
    plans.name = req.body.name
    plans.price = req.body.price
    await plans.save();
    res.json(plans);
})

router.delete("/plans/delete/:id" ,[auth,admin], async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidId) return res.status(400).json({ message: "invalid id" })

    const plan = await Plan.findById(req.params.id);
    
    if (!plan) return res.status(404).json({ message: "no plan with the given id" })
    await Plan.findByIdAndDelete(req.params.id)
    const plans = await Plan.find()
    res.json(plans)
})

module.exports = router