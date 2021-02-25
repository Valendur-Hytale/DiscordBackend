const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('_helpers/db');
const User = db.User;
const Interface = db.Interface;
const Technology = db.Technology;

const schema = new Schema({
    NAME: { type: String, required: true },
    A_DESCRIPTION: { type: String, required: false },
    A_ID: { type: String, required: false, unique: false },
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
    A_ADDITIONAL_INFORMATION_ON_ORGANISATION: { type: String, required: false },
    respDoamin: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_DOMAINS: { type: String, required: false },
    respArchitect: { type: String, required: false },
    supContObj: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_PRINCIPLES: { type: String, required: false },
    respRisks: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_RISKS: { type: String, required: false },
    supBusiCapa: { type: String, required: false },
    supBusiFunc: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_CAPABILITIES_AND_FUNCTIONS: { type: String, required: false },
    A_ATTACHMENT_LIST: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_ATTACHMENTS: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_CONTENT: { type: String, required: false },
    supProd: { type: String, required: false },
    supProc: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_PRODUCTS_PROCESSES: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_BUSINESS_CONTEXT: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_BUSINESS_OBJECTS: { type: String, required: false },
    refBServices: { type: String, required: false },
    refGServices: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_SERVICES: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_PROJECTS: { type: String, required: false },
    refBInterf: [{ type: Schema.Types.ObjectId, ref: 'Interface', required: false }],
    refGInterf: [{ type: Schema.Types.ObjectId, ref: 'Interface', required: false }],
    infFlow: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_INTERFACES: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_COMPONENTS: { type: String, required: false },
    refTechno: [{ type: Schema.Types.ObjectId, ref: 'Technology', required: false }],
    refTechno2: [{ type: Schema.Types.ObjectId, ref: 'Technology', required: false }],
    A_ADDITIONAL_INFORMATION_ON_TECHNOLOGIES: { type: String, required: false },
    refInfra: { type: String, required: false },
    refLoc: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_DEPLOYMENT: { type: String, required: false },
    A_INVESTMENT_COSTS: { type: String, required: false },
    A_OPERATING_COSTS: { type: String, required: false },
    licenseContract: { type: String, required: false },
    A_ADDITIONAL_INFORMATION_ON_COSTS_LICENCES: { type: String, required: false },
});

schema.set('toJSON', { virtuals: true });





module.exports = mongoose.model('Application', schema);