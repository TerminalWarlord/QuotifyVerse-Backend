const express = require('express');


const router = express.Router();

const { createQuote } = require('../../controller/admin/adminQuotesController');
const { authWall } = require('../../controller/authController');

router.use('/create', authWall, createQuote);



module.exports = router;