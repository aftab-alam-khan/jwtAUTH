const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    title: {
        type: String,
        required: true,
        min: 6,
        max: 55
    },
    message: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Post', postSchema);
