const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    about_author: { type: String },
    dob: { type: String },
})

// add methods here
authorSchema.methods.getSlug = function () {
    console.log(this.name)
    const name = this.name.replace(" ", "").toLowerCase();
    return name;
}


module.exports = mongoose.model('Author', authorSchema);