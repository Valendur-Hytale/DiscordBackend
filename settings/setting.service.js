const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Setting = db.Setting;

module.exports = {
    getById,
    update,
    delete: _delete
};



async function getById(id) {
    return await Setting.findOne({user: id});
}


async function update(id, settingParam) {
    var oldSetting = await Setting.findOne({user: id});

    /*var setting = new Setting(settingParam);
    console.log(setting);
    setting.user = id;
    setting._id = oldSetting._id;*/


    // copy settingParam properties to setting
    if (oldSetting == null){
        oldSetting = new Setting();
        oldSetting.user = id;
    }
    Object.assign(oldSetting, settingParam);
    //console.log(setting);
    //console.log(oldSetting);
    await oldSetting.save();
}


function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}


async function _delete(id) {
    await Setting.find({user: id}).remove();
}