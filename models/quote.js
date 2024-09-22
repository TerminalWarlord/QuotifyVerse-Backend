const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    quote: { type: String, required: true },
    about_quote: { type: String, required: true },
    topics: [
        {
            topicName: { type: String },
            topicSlug: { type: String },
        }
    ],
    author_id: { type: Schema.Types.ObjectId, ref: 'Author', required: true }
})

// add methods here



module.exports = mongoose.model('Quote', quoteSchema);
// id
// quote
// author_id
// about_quote
// topics