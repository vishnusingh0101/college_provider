const express = require('express');

const router = express.Router();

const collegesControl = require('../controller/getdata.js');
<<<<<<< HEAD
=======
// const auth = require('../middleware/auth.js');
>>>>>>> f0a922c72e1e6c67bcdcfe99b1fe9df120cb069d

router.get('/collegelist', collegesControl.collegeList);
router.get('/alumnilist', collegesControl.alumniList);
router.get('/studentlist', collegesControl.studentList);

module.exports = router;