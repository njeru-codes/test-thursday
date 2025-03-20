const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: { type: String, required: true }, // Store user's email
    text: { type: String, required: true, minlength: 3, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
});

// Create and export the model
module.exports = mongoose.model('Comment', commentSchema);
