//File name: contact.js, Student Name: Wan Wan, Student ID: 301326973, Date: 19 Feb 2023

let mongoose = require('mongoose');

//create a model class
let contactModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String,
},

{
    collection: "contactinfo"
});

module.exports = mongoose.model('Contact', contactModel)