
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const client = new Schema({
    client_firstName: { type: String },
    client_lastName: { type: String },
    client_gender: { type: String },
    client_address: { type: String },
    client_phone: { type: String },
    client_mail: { type: String },
    client_nationality: { type: String },
    client_doc: { type: String },
    client_number: { type: String },
    client_validity: { type: Date },
}, {
    timestamps: true,
});

client.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all', 
});

module.exports = mongoose.model('client', client);
