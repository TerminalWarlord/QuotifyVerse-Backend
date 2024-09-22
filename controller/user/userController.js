const User = require('../../models/user');


const bookmarkQuote = async (req, res, next) => {
    const quoteId = req.params.quoteId;
    try {
        const response = await req.user.addToFavorites(quoteId);
    } catch (err) {
        console.log(err);
        return res.status(503).json({
            message: "Quote is already in favorites."
        });
    }
    return res.status(200).json({
        message: "Quote added to bookmark!"
    });
}
const removeBookmark = async (req, res, next) => {
    const quoteId = req.params.quoteId;
    try {
        const response = await req.user.removeFromFavorites(quoteId);
    } catch (err) {
        return res.status(503).json({
            message: "Quote doesn\'t exist in favorites."
        });
    }
    return res.status(200).json({
        message: "Quote has been removed from bookmarks!"
    });
}


module.exports = {
    bookmarkQuote,
    removeBookmark
};