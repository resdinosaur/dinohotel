
const roomType = require('../models/roomType');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class roomTypeController {

    // ---------------------------- ROOM TYPE CONTROL ----------------------------
    // [GET] /admin/room-type
    roomTypeShow(req, res, next) {

        Promise.all([roomType.find(), roomType.countDocumentsDeleted()])
            .then(([room_types, deletedCount]) =>
                res.render('roomType/roomType', { 
                    deletedCount,
                    room_types: multipleMongooseToObject(room_types)
                })
            )
            .catch(next);
    }

    // [GET] /admin/room-type/create
    roomTypeCreate(req, res, next) {
        res.render('roomType/roomTypeCreate');
    }

    // [POST] /admin/room-type/store
    roomTypeStore(req, res, next) {
        const roomtypeData = new roomType(req.body);
        roomtypeData.save()
            .then(() => res.redirect('/admin/room-type'))
            .catch(error => {

            });
    }

    // [GET] /admin/room-type/:id/edit
    roomTypeEdit(req, res, next) {
        roomType.findById(req.params.id)
            .then(room_type => res.render('roomType/roomTypeEdit', {
                room_type: mongooseToObject(room_type)
            }))
            .catch(next);
    }

    // [PUT] /admin/room-type/:id
    roomTypeUpdate(req, res, next) {
        roomType.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/room-type'))
            .catch(next);
    }

    // [DELETE] /admin/room-type/:id
    roomTypeDelete(req, res, next) {
        roomType.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /admin/room-type/:id/force
    roomTypeDeleteForce(req, res, next) {
        roomType.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/room-type/trash
    roomTypeTrash(req, res, next) {
        roomType.findDeleted()
            .then(room_types => {
                res.render('roomType/roomTypeTrash', { 
                    room_types: multipleMongooseToObject(room_types)
                });
            })
            .catch(next);
    }

    // [PATCH] /admin/room-type/:id/restore
    roomTypeRestore(req, res, next) {
        roomType.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    // ---------------------------------------------------------------------------

}

module.exports = new roomTypeController;
