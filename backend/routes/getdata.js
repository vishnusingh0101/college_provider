const express = require('express');

const router = express.Router();

const collegesControl = require('../controller/getdata.js');

router.get('/collegelist', collegesControl.collegeList);
router.get('/alumnilist', collegesControl.alumniList);
router.get('/studentlist', collegesControl.studentList);

module.exports = router;