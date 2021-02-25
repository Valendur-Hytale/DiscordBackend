const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');
const User = db.User;

const schema = new Schema({

C_APPLICATION_COMPONENT: {type: Object},
C_APPLICATION_INTERFACE: {type: Object},
C_SYSTEM_SOFTWARE: {type: Object},
 user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Setting', schema);
