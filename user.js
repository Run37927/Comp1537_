const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema= new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        required: true
    },
    viewed: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model("User", userSchema)