const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name:{type:String,
    required:true},
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 120,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const validateUser = (user) => {
    const schema = Joi.object({
        name:Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(12).required()
    })
    return schema.validate(user)
}
const User=mongoose.model("user",userSchema)//in index.js

module.exports = { User, validateUser }