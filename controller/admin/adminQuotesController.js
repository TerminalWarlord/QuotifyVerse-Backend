const Author = require("../../models/author");
const Quote = require("../../models/quote");

const createQuote = async (req, res, next) => {
    const quote = req.body.quote;
    const about_quote = req.body.about_quote;
    const topics = req.body.topics;
    const author_name = req.body.author_name;
    const about_author = req.body.about_author;


    let author = await Author.findOne({
        name: author_name
    })
    if (!author) {
        author = new Author({
            name: author_name,
            about_author: about_author,
        });
        author.slug = author.getSlug();
        author.save();
    }
    try {
        await Quote.create({
            author_id: author._id,
            about_quote: about_quote,
            topics: topics,
            quote: quote,
        })
    }
    catch (err) {
        return res.status(503).json({
            message: "Failed to create quote!",
        });
    }
    res.status(200).json({
        message: "Quote has been created!",
    });

}



module.exports = {
    createQuote,
}