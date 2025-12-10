// Food.js
const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    daySinceIate: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Food", foodSchema)
