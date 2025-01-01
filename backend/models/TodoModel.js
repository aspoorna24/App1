const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
        },
    date: {
        type: Date,
        default: Date.now
        } 
})

module.exports = mongoose.model('TodoTask',todoSchema);