const router = require('express').Router(),
    accountController = require('../controllers/accountController');

router.get('/', accountController.logout);
router.get('/data', accountController.getAccountData);
router.post('/', accountController.login);
router.post('/data', accountController.postAccountData);

module.exports = router;
