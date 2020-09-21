
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const roomType = new Schema({
    room_type_name: { type: String },
    max_adults: { type: Number },
    max_children: { type: Number },
    price: { type: Number },
    unit: { type: String }
}, {
    timestamps: true,
});

roomType.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all', 
});

module.exports = mongoose.model('room_type', roomType);
