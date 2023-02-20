//File name: contacts.js, Student Name: Wan Wan, Student ID: 301326973, Date: 19 Feb 2023
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let ContactListController = require('../controllers/contactlist');
//connect to our contact model
let contact = require('../model/contact');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/*GET Route for the Contact page*/
router.get('/', ContactListController.displayContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, ContactListController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, ContactListController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, ContactListController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, ContactListController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', requireAuth, ContactListController.performDelete);

module.exports = router;