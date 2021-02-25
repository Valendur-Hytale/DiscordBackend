const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');
const User = db.User;

const schema = new Schema({
    NAME: { type: String, required: true },
    A_DESCRIPTION: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });





module.exports = mongoose.model('Interface', schema);