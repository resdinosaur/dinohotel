const logInRouter = require('./login');
const SiteRouter = require('./site');
const AdminRouter = require('./admin');

function route (app) {

    app.use('/login', logInRouter);

    app.use('/admin', AdminRouter);

    app.use('/', SiteRouter);

    // app.get('/', (req, res) => {
    //     return res.render('home');
    //   })
      
    // app.get('/login', (req, res) => {
    //     return res.render('login');
    // })
}

module.exports = route;