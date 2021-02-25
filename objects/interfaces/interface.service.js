const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Interface = db.Interface;

module.exports = {
    getAllByUser,
    create,
    createBulk,
    delete: _delete,
	deleteArray: _deleteArray,
	update
};


async function getAllByUser(userID) {
    return await Interface.find({user: userID}).populate('risks').select('-user');
}

async function create(applicationParam, userID) {
    // validate
    if (await Interface.findOne({ NAME: applicationParam.NAME, user: userID })) {
        throw 'The name "' + applicationParam.NAME + '" is already taken userID: ' + userID;;
    }
    const application = new Interface(applicationParam);
	
	application.user = userID;
    await application.save();
}

async function createBulk(objParam, userID) {
    for (let i= 0; i < objParam.length; i++) {
        const obj = new Obj(objParam[i]);
        obj.user = userID;
        await obj.save();
    }    
}

async function update(applicationParam, userID) {
    const application = await Interface.findOne({ _id: applicationParam._id, user: userID });

    // validate
    if (!application) throw 'Interface nicht gefunden';
    if (application.NAME !== applicationParam.NAME && await Interface.findOne({ NAME: applicationParam.NAME,  user: userID })) {
        throw 'Username "' + applicationParam.NAME + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(application, applicationParam);

    await application.save();
}

async function _delete(id, userID) {
    await Interface.deleteOne({_id: id, user: userID});
}

async function _deleteArray(jsonArray, userID) {
	//jsonArray.forEach(function(obj) { await Application.deleteOne({_id: obj._id, user: userID}); });
	for(var i = 0; i < jsonArray.length; i++) {
    	var obj = jsonArray[i];
    	await Interface.deleteOne({_id: obj._id, user: userID});
	}
}