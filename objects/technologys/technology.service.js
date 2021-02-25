const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Obj = db.Technology;

module.exports = {
    getAllByUser,
    create,
    createBulk,
    delete: _delete,
	deleteArray: _deleteArray,
	update
};


async function getAllByUser(userID) {
    return await Obj.find({user: userID}).select('-user');
}

async function create(objParam, userID) {
    // validate
    if (await Obj.findOne({ NAME: objParam.NAME,  user: userID })) {
        throw 'The name "' + objParam.NAME + '" is already taken userID: ' + userID;;
    }
    const obj = new Obj(objParam);
	
	obj.user = userID;
    await obj.save();
}

async function createBulk(objParam, userID) {
    
    for (let i= 0; i < objParam.length; i++) {
        const obj = new Obj(objParam[i]);
        obj.user = userID;
        await obj.save();
    }    
}

async function update(objParam, userID) {
    const obj = await Obj.findOne({ _id: objParam._id, user: userID });

    // validate
    if (!obj) throw 'Obj not found';
    if (obj.NAME !== objParam.NAME && await Obj.findOne({ NAME: objParam.NAME,  user: userID })) {
        throw 'Username "' + objParam.NAME + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(obj, objParam);

    await obj.save();
}

async function _delete(id, userID) {
    await Obj.deleteOne({_id: id, user: userID});
}

async function _deleteArray(jsonArray, userID) {
	//jsonArray.forEach(function(obj) { await Obj.deleteOne({_id: obj._id, user: userID}); });
	for(var i = 0; i < jsonArray.length; i++) {
    	var obj = jsonArray[i];
    	await Obj.deleteOne({_id: obj._id, user: userID});
	}
}