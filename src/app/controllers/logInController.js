
class logInController {

    // [GET] /login
    index(req, res) {
        res.render('login');
    }

}

module.exports = new logInController;