const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');
const User = db.User;

const application = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    risks: [{ type: String, required: false }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, default: Date.now }
});

application.set('toJSON', { virtuals: true });


const risk = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

risk.set('toJSON', { virtuals: true });




module.exports = mongoose.model('Application', application);
module.exports = mongoose.model('Risk', risk);