const { Schema, model } = require('mongoose');

const User = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    winsCount: { type: Number, default: 0 }
});

module.exports = model('User', User);