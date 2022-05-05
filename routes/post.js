
const { Router } = require('express');
const router = Router();
const postController = require('./../controllers/post');
const imageUpload = require('./../utilities/multer').imageUpload();
const appConfigs = require('./../config/app');
const auth = require('./../utilities/auth');



router.get('/', postController.list);
router.post('/', auth, imageUpload.array('images', appConfigs.post.image_upload_max_count),
    postController.create);
router.put('/:postId', auth, imageUpload.array('images', appConfigs.post.image_upload_max_count),
    postController.update);
router.delete('/:postId', auth, postController.delete);



module.exports = router;
