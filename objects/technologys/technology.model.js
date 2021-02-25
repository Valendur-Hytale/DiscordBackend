const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');
const User = db.User;
const Interface = db.Interface;

const schema = new Schema({
    NAME: { type: String, required: true },
    A_DESCRIPTION: { type: String, required: false },
    idField: { type: String, required: false, unique: false },
    risks: [{ type: Schema.Types.ObjectId, ref: 'Interface', required: false }],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    createdDate: { type: Date, default: Date.now },
	endOfSupport: { type: Date, required: false },
	relevant: { type: Boolean, required: false },
    monthlyCosts: { type: Number, required: false },
    respActor: { type: String, required: false },
    respActorRepr: { type: String, required: false },
    respActorDev: { type: String, required: false },
    respActorOper: { type: String, required: false },
    respOrg: { type: String, required: false },
    respOrgCust: { type: String, required: false },
    noteOrg: { type: String, required: false },
    respDoamin: { type: String, required: false },
    noteDomain: { type: String, required: false },
    respArchitect: { type: String, required: false },
    supContObj: { type: String, required: false },
    notePrinziples: { type: String, required: false },
    respRisks: { type: String, required: false },
    noteRisks: { type: String, required: false },
    supBusiCapa: { type: String, required: false },
    supBusiFunc: { type: String, required: false },
    noteBusiCapFunc: { type: String, required: false },
    refDoc: { type: String, required: false },
    noteDoc: { type: String, required: false },
    noteDemand: { type: String, required: false },
    supProd: { type: String, required: false },
    supProc: { type: String, required: false },
    noteProdProc: { type: String, required: false },
    noteContext: { type: String, required: false },
    noteBusiObjects: { type: String, required: false },
    refBServices: { type: String, required: false },
    refGServices: { type: String, required: false },
    noteServices: { type: String, required: false },
    noteProjects: { type: String, required: false },
    refBInterf: [{ type: Schema.Types.ObjectId, ref: 'Interface', required: false }],
    refGInterf: [{ type: Schema.Types.ObjectId, ref: 'Interface', required: false }],
    infFlow: { type: String, required: false },
    noteInterf: { type: String, required: false },
    noteComp: { type: String, required: false },
    refTechno: { type: String, required: false },
    refTechno2: { type: String, required: false },
    noteTechno: { type: String, required: false },
    refInfra: { type: String, required: false },
    refLoc: { type: String, required: false },
    noteProduction: { type: String, required: false },
    investCost: { type: String, required: false },
    operationCost: { type: String, required: false },
    licenseContract: { type: String, required: false },
    noteCostLicense: { type: String, required: false },
});

schema.set('toJSON', { virtuals: true });





module.exports = mongoose.model('Technology', schema);