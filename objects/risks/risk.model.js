const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');
const User = db.User;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Risk', schema);