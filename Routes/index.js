const express = require('express');
const blog = require('./blog');
const user = require('./user');
const authMiddleWare = require('../middlwares/auth');

const router = express.Router();


router.use('/blogs',authMiddleWare,blog);
router.use('/users',user);

module.exports = router;