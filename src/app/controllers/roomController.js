
const roomType = require('../models/roomType');
const room = require('../models/room');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class roomController {

    // --------------------------- ROOM CONTROL ----------------------------------
    // [GET] /admin/room
    roomShow(req, res, next) {

        Promise.all([room.find(), roomType.find(), room.countDocumentsDeleted()])
            .then(([rooms, room_types, deletedCount]) =>
                res.render('room/room', {
                    rooms: multipleMongooseToObject(rooms),
                    room_types: multipleMongooseToObject(room_types),
                    deletedCount
                })
            )
            .catch(next);
    }

    // [GET] /admin/room/create
    roomCreate(req, res, next) {

        roomType.find()
            .then(room_types => {
                res.render('room/roomCreate', { 
                    room_types: multipleMongooseToObject(room_types)
                });
            })
            .catch(next);
    }

    // [POST] /admin/room/store
    roomStore(req, res, next) {
        req.body.room_situation = false;
        const roomData = new room(req.body);
        roomData.save()
            .then(() => res.redirect('/admin/room'))
            .catch(error => {

            });
    }

    // [GET] /admin/room/:id/edit
    roomEdit(req, res, next) {

        Promise.all([ roomType.find(), room.findById(req.params.id)])
            .then(([room_types, room]) =>
                res.render('room/roomEdit', {
                    room_types: multipleMongooseToObject(room_types),
                    room: mongooseToObject(room)
                })    
            )
            .catch(next);
    }

    // [PUT] /admin/room/:id
    roomUpdate(req, res, next) {
        room.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/room'))
            .catch(next);
    }

    // [DELETE] /admin/room/:id
    roomDelete(req, res, next) {
        room.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /admin/room-type/:id/force
    roomDeleteForce(req, res, next) {
        room.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/room/:id/restore
    roomRestore(req, res, next) {
        room.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/room/trash
    roomTrash(req, res, next) {

        Promise.all([roomType.find(),  room.findDeleted()])
            .then(([room_types, rooms]) =>
                res.render('room/roomTrash', {
                    room_types: multipleMongooseToObject(room_types),
                    rooms: multipleMongooseToObject(rooms)
                })
            )
            .catch(next);
    }
    // ---------------------------------------------------------------------------

}

module.exports = new roomController;
