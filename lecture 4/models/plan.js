const mongoose = require("mongoose");
const Joi=require('joi');

const planSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
},
    price: {
        type:Number,
        required:true
},
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan"
        }
    ]
});

const validateplan =(plan)=>{
const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
})
return schema.validate(plan)
}

const Plan=mongoose.model("plan",planSchema)//in index.js

module.exports = { Plan, validateplan }