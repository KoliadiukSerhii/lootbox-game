const { model, Schema, ObjectId } = require('mongoose');

const LootItem = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    chance: { type: Number, default: 0 },
    user: { type: ObjectId, ref: 'User' },
    created: { type: Date, default: Date.now }
});

module.exports = model('LootItem', LootItem);