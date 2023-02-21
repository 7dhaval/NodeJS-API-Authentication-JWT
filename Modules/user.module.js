const mongoose = require('mongoose');
const express = require("express");

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

const User = new mongoose.model('user', UserSchema);
module.exports = User