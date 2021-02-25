const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const multiUtil = require('_helpers/multiUtil')
const Obj = db.C_APPLICATION_COMPONENT;

module.exports = {
    getAllByUser,
    create,
    createBulk,
    delete: _delete,
	deleteArray: _deleteArray,
	update
};


async function getAllByUser(userID) {
   //return await Obj.find({user: userID}).populate('RC_ASSOCIATED_VIEWS').populate('RC_IS_APPLICATION_OWNER').populate('RC_ACCOUNTABLE_PERSON').populate('RC_CONSULTED_PERSON').populate('RC_INFORMED_PERSON').populate('RC_VENDOR').populate('RC_REALIZATION').populate('RC_ASSIGNMENT').populate('RC_AGGREGATION').populate('RC_COMPOSITION').populate('RC_INFLUENCE').populate('RC_ACCESS').populate('RC_SERVING').populate('RC_TRIGGERING').populate('RC_FLOW').populate('RC_SPECIALIZATION').populate('RC_ASSOCIATION').populate('RC_REPLACES_APPLICATION_COMPONENT').populate('RC_PREDECESSOR_OBJECT').select('-user');
   console.log("pre");
   var final = await Obj.find({user: userID}).select('-user');
   //console.log("final: " + final);
   /*console.log("found! merging..." + JSON.stringify(final));
   if (Array.isArray(final)){
        for (let obj of final){
            console.log("merging " + obj.NAME + ": " + JSON.stringify(obj));
            //var obj2 = await merge(obj);
            console.log("after merge");
            //obj = obj2;
        }
   } else {
       console.log("merging final " + final.NAME + ": " + JSON.stringify(final));
       console.log("");
       final = merge(final);
   }*/
   return final;
}

async function create(objParam, userID) {
    // validate
    if (await Obj.findOne({ NAME: objParam.NAME, user: userID })) {
        throw 'The name "' + objParam.NAME + '" is already taken userID: ' + userID;;
    }

    objParam = multiUtil.seperate(objParam);

    const obj = new Obj(objParam);
	
	obj.user = userID;
    await obj.save();
}



async function createBulk(objParam, userID) {
    for (let i= 0; i < objParam.length; i++) {
        /*const obj = new Obj(objParam[i]);
        obj.user = userID;
        await obj.save();*/
        await create(objParam[i], userID);
    }    
}

async function update(objParam, userID) {
    const obj = await Obj.findOne({ _id: objParam._id, user: userID });

    // validate
    if (!obj) throw 'Obj not found';
    if (obj.NAME !== objParam.NAME && await Obj.findOne({ NAME: objParam.NAME,  user: userID })) {
        throw 'Username "' + objParam.NAME + '" is already taken';
    }

    objParam = multiUtil.seperate(objParam);

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
