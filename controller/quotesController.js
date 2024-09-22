const fs = require('fs');



const getAllQuotes = (req, res, next) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ status: "Something went wrong" });
        }
        else {
            return res.status(200).json(JSON.parse(data));
        }
    })
}

const getQuote = (req, res, next) => {
    fs.readFile('quote.json', (err, data) => {
        if (err) {
            return res.status(500).json({ status: "Something went wrong" });
        }
        else {
            return res.status(200).json(JSON.parse(data));
        }
    })
}


module.exports = {
    getAllQuotes,
    getQuote
}