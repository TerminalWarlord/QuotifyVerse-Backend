const express = require('express');


const router = express.Router();
const { authWall } = require('../controller/authController');
const { getAllQuotes, getQuote } = require('../controller/quotesController');
const { bookmarkQuote, removeBookmark } = require('../controller/user/userController');


router.use('/quote/:quoteId', getQuote);
router.use('/quotes', getAllQuotes);



router.use('/add-bookmark/:quoteId', authWall, bookmarkQuote);
router.use('/remove-bookmark/:quoteId', authWall, removeBookmark);



module.exports = router;