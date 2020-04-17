const router = require('express').Router(),
    userController = require('../controller/userController');

router.post('/', userController.logIn);

module.exports = router;
