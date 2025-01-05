const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
        },
    date: {
        type: Date,
        default: Date.now
        },
    done:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('TodoTask',todoSchema);