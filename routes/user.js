
const { Router } = require('express');
const router = Router();
const userController = require('./../controllers/user');
const auth = require('./../utilities/auth');



router.get('/details', auth, userController.details);
router.put('/change-password', auth, userController.changePassword);
router.put('/change-details', auth, userController.changeDetails);



module.exports = router;
