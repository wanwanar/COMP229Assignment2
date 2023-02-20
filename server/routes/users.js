//File name: users.js, Student Name: Wan Wan, Student ID: 301326973, Date: 19 Feb 2023
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('There is no user page at this moment.');
});

module.exports = router;
