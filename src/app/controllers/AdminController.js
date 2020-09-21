
class AdminController {

    // [GET] /admin
    show(req, res, next) {
        res.render('admin');
    }
}

module.exports = new AdminController;
