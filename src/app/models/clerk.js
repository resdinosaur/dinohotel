
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const clerk = new Schema({
    clerk_firstName: { type: String },
    clerk_lastName: { type: String },
    clerk_gender: { type: String },
    clerk_address: { type: String },
    clerk_phone: { type: String },
}, {
    timestamps: true,
});

clerk.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all', 
});

module.exports = mongoose.model('clerk', clerk);
