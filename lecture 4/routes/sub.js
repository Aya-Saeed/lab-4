const express=require("express");
const {Plan}=require("../models/plan");
const auth=require("../middleware/auth");
const mongoose =require("mongoose");
const { invalid } = require("joi");

const router=express.Router()
router.get("/allplans",auth,async(res,req)=>
{
    const plans=await Plan.find()
    res.json(plans)
})
router.post("/subscribe/:id",auth,async(res,req)=>{
    const isValidId =mongoose.Types.ObjectId.isValid(req.params.id);
    if(!isValidId)return res.status(400).json({messade:"invalid id"})
    const plan=await Plan.findById(req.params.id)
    if(!plan) return res.status(404).json({message:"no plans with this id"})
    const plans=await Plan.findById(req.params.id);
    plans.users=req.body.users;
    await plans.save();
    res.json(plans);
})
router.delete("/usnsub/:id",auth,async(req,res)=>{
    const isValidId=mongoose.Types.ObjectId(req.params.id);
    if(!isValidId) return res.status(400).json({message:"invalid id"})
})