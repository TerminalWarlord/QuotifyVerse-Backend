const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user');
const Topic = require('../models/topic');

const postSignUp = async (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 5);
    const name = req.body.name;
    try {
        await User.create({
            username: username,
            email: email,
            password: password,
            name: name,
        })
    }
    catch (err) {
        return res.status(403).json({ message: "Failed to create an account!" });
    }

    res.status(200).json({ message: "You have signed up successfully!" });
}

const postSignIn = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({
        username: username,
    });
    if (!user) {
        return res.status(403).json({
            message: "User does not exist!"
        });
    }
    const hashedPassword = await bcrypt.compare(password, user.password);
    if (!hashedPassword) {
        return res.status(403).json({
            message: "Invalid password!"
        });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ message: 'Successfully logged in!', token: token });
}


const getMe = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    if (!decodedToken) {
        return res.status(401).json({
            message: "Unauthorized!"
        });
    }
    const user = await User.findById(decodedToken.userId);
    if (!user) {
        return res.status(401).json({
            message: "User doesn't exist!.",
            error: true,
        })
    }
    const result = await user.populate({
        path: 'favorites.quoteId',
        select: 'quote topics',
        populate: [
            {
                path: 'author_id',
                select: 'name slug'
            }
        ]
    });
    const favoritesQuotes = result.favorites.map(fav => {
        console.log(fav);
        // TO DO: FIX AUTHOR_ID underscore to lowerCamelCase
        return {
            quoteId: fav.quoteId._id,
            quote: fav.quoteId.quote,
            topics: fav.quoteId.topics.map(topic => {
                return { topicName: topic.topicName, topicSlug: topic.topicSlug };
            }),
            authorSlug: fav.quoteId.author_id.slug,
            authorName: fav.quoteId.author_id.name,
        };
    });
    return res.status(200).json({
        message: "Successful.",
        userId: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        favorites: favoritesQuotes
    });

}

const authWall = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    }
    catch (err) {
        return res.status(403).json({ message: "Unauthorized!" });
    }
    if (!decodedToken) {
        return res.status(422).json({
            message: "Unauthorized!"
        });
    }
    req.user = await User.findById(decodedToken.userId);
    next();
}


module.exports = {
    postSignUp,
    postSignIn,
    getMe,
    authWall
}