//File name: contactlist.js, Student Name: Wan Wan, Student ID: 301326973, Date: 19 Feb 2023

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// create a reference to the model
let ContactList = require('../model/contact');

module.exports.displayContactList = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages:req.flash('loginMessage'),
            displayName:req.user?req.user.displayName:''
        })
    }
    else
    {
    ContactList.find().sort({ name: 1 }).exec((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);

            res.render('contactlist/list', 
            {title: 'Business Contact List', 
            ContactList:contactList, 
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
    }
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('contactlist/add', {title: 'Add Contact', 
    displayName: req.user ? req.user.displayName : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    let newContact = ContactList({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,
    });

    ContactList.create(newContact, (err, ContactList) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contactlist');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    ContactList.findById(id, (err, contactlistToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('contactlist/edit', {title: 'Edit Contact List', contactlist: contactlistToEdit, 
            displayName: req.user ? req.user.displayName : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedContactList = ContactList({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email,

    });

    ContactList.updateOne({_id: id}, updatedContactList, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the contact list
            res.redirect('/contactlist');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    ContactList.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the contact list
             res.redirect('/contactlist');
        }
    });
}