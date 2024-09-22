const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, default: false },
    favorites: [
        {
            quoteId: {
                type: Schema.Types.ObjectId,
                ref: 'Quote',
                required: true
            }
        }
    ],

})

userSchema.methods.addToFavorites = async function (quoteId) {
    const favs = this.favorites;
    const itemIndex = favs.findIndex(item => {
        return item.quoteId.toString() === quoteId;
    });
    if (itemIndex !== -1) {
        throw new Error('Quote is already in favorites.');
    }
    // Add the new quote and save
    this.favorites = [...this.favorites, { quoteId: quoteId }];
    return await this.save();
};

userSchema.methods.removeFromFavorites = function (quoteId) {
    const favs = this.favorites;
    const itemIndex = favs.findIndex(item => item.quoteId.toString() === quoteId);
    if (itemIndex === -1) {
        throw new Error('Quote doesn\'t exist in favorites.');
    }
    this.favorites = this.favorites.filter(item => item.quoteId.toString() !== quoteId);
    return this.save();
}

module.exports = mongoose.model('User', userSchema);