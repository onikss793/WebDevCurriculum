const router = require('express').Router(),
    userController = require('../controller/userController');

router.get('/', userController.logOut);
router.post('/', userController.logIn);

module.exports = router;
