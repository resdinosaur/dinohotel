const express = require('express');
const router = express.Router();

const logInController = require('../app/controllers/logInController');

router.get('/', logInController.index)

module.exports = router;