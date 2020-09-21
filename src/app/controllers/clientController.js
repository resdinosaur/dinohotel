
const client = require('../models/client');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class clientController {

    // --------------------------- CLIENT CONTROL --------------------------------
    // [GET] /admin/client
    clientShow(req, res, next) {

        Promise.all([client.find(), client.countDocumentsDeleted()])
            .then(([clients, deletedCount]) =>
                res.render('client/client', { 
                    deletedCount,
                    clients: multipleMongooseToObject(clients)
                })
            )
            .catch(next);

        

        // res.render('client/client');
    }

    // [GET] /admin/client/create
    clientCreate(req, res, next) {

        client.find()
            .then(clients => {
                res.render('client/clientCreate', { 
                    clients: multipleMongooseToObject(clients)
                });
            })
            .catch(next);
    }

    // [POST] /admin/client/store
    clientStore(req, res, next) {
        const clientData = new client(req.body);

        // res.json(clientData)
        clientData.save()
            .then(() => res.redirect('/admin/client'))
            .catch(error => {

            });
    }

    // [GET] /admin/client/:id/edit
    clientEdit(req, res, next) {
        client.findById(req.params.id)
            .then(client => res.render('client/clientEdit', {
                client: mongooseToObject(client)
            }))
            .catch(next);
    }

    // [PUT] /admin/client/:id
    clientUpdate(req, res, next) {
        client.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/client'))
            .catch(next);
    }

    // [DELETE] /admin/client/:id
    clientDelete(req, res, next) {
        client.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /admin/client/:id/force
    clientDeleteForce(req, res, next) {
        client.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/client/:id/restore
    clientRestore(req, res, next) {
        client.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/client/trash
    clientTrash(req, res, next) {
        client.findDeleted()
            .then(clients => {
                res.render('client/clientTrash', { 
                    clients: multipleMongooseToObject(clients)
                });
            })
            .catch(next);
    }

    // ---------------------------------------------------------------------------

}

module.exports = new clientController;