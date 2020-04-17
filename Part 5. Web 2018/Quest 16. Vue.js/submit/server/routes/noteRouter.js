const router = require('express').Router(),
    noteController = require('../controller/noteController');

router.get('/', noteController.getManyNotes);
router.get('/:id', noteController.getNote);
router.post('/', noteController.createNote);
router.post('/:id', noteController.updateNote);

module.exports = router;
