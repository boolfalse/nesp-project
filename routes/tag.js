
const { Router } = require('express');
const router = Router();
const tagController = require('./../controllers/tag');
const auth = require('./../utilities/auth');



router.get('/', tagController.list);
router.post('/', auth, tagController.create);
router.put('/:tagId', auth, tagController.update);
router.delete('/:tagId', auth, tagController.delete);



module.exports = router;
