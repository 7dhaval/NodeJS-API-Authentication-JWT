const mongoose = require('mongoose');
const express = require("express");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})

UserSchema.pre('save', async  function(next)  {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword 
        console.log('Called before saving a user');
        next()
    } catch (error) {
        next(error)
    }
})

UserSchema.methods.isValidPassword = async function(password){
    try {
        return await bcrypt.compare(password, this.password)
    } catch (error) {
        throw error
    }
}


const User = new mongoose.model('user', UserSchema);
module.exports = User