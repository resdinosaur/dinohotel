
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const room = new Schema({
    room_number: { type: String },
    room_type_id: mongoose.ObjectId,
    room_situation: { type: Boolean }
}, {
    timestamps: true,
});

room.plugin(mongooseDelete, { 
    deletedAt : true,
    overrideMethods: 'all', 
});

module.exports = mongoose.model('room', room);
