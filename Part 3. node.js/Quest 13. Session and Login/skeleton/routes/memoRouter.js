const router = require('express').Router();
const memoController = require('../controllers/memoController');

router.get('/', memoController.getMemoList);
router.get('/:id', memoController.getMemo);
router.post('/', memoController.createMemo);
router.post('/:id', memoController.updateMemo);
router.delete('/:id', memoController.deleteMemo);

module.exports = router;
