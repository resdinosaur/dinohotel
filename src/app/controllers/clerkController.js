
const clerk = require('../models/clerk');

const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class clerkController {

    // --------------------------- CLERK CONTROL ---------------------------------
    // [GET] /admin/clerk
    clerkShow(req, res, next) {

        Promise.all([clerk.find(), clerk.countDocumentsDeleted()])
            .then(([clerks, deletedCount]) =>
                res.render('clerk/clerk', { 
                    deletedCount,
                    clerks: multipleMongooseToObject(clerks)
                })
            )
            .catch(next);
    }

    // [GET] /admin/clerk/create
    clerkCreate(req, res, next) {

        clerk.find()
            .then(clerks => {
                res.render('clerk/clerkCreate', { 
                    clerks: multipleMongooseToObject(clerks)
                });
            })
            .catch(next);
    }

    // [POST] /admin/clerk/store
    clerkStore(req, res, next) {
        const clerkData = new clerk(req.body);

        // res.json(clerkData)
        clerkData.save()
            .then(() => res.redirect('/admin/clerk'))
            .catch(error => {

            });
    }

    // [GET] /admin/clerk/:id/edit
    clerkEdit(req, res, next) {
        clerk.findById(req.params.id)
            .then(clerk => res.render('clerk/clerkEdit', {
                clerk: mongooseToObject(clerk)
            }))
            .catch(next);
    }

    // [PUT] /admin/clerk/:id
    clerkUpdate(req, res, next) {
        clerk.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/clerk'))
            .catch(next);
    }

    // [DELETE] /admin/clerk/:id
    clerkDelete(req, res, next) {
        clerk.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /admin/clerk/:id/force
    clerkDeleteForce(req, res, next) {
        clerk.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [PATCH] /admin/clerk/:id/restore
    clerkRestore(req, res, next) {
        clerk.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [GET] /admin/clerk/trash
    clerkTrash(req, res, next) {
        clerk.findDeleted()
            .then(clerks => {
                res.render('clerk/clerkTrash', { 
                    clerks: multipleMongooseToObject(clerks)
                });
            })
            .catch(next);
    }
    // ---------------------------------------------------------------------------

}

module.exports = new clerkController;
