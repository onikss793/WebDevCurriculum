const router = require('express').Router();
const sessionDataController = require('../controller/sessionDataController');

router.get('/', sessionDataController.loadSessionData);
router.post('/', sessionDataController.uploadSessionData);

module.exports = router;
