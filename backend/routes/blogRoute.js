const express = require('express');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { createBlog,
        updateBlog,
        getBlog,
        getAllBlogs,
        deleteBlog,
        likeBlog,
        disliketheBlog,
        uploadImages,
} = require('../controller/blogCtrl');
const { blogImgResize, uploadPhoto } = require('../middlewares/uploadImages');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put('/upload-images/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), blogImgResize, uploadImages);

router.put('/likes', authMiddleware, likeBlog);
router.put('/dislikes', authMiddleware, disliketheBlog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);

router.delete('/:id', authMiddleware, isAdmin, deleteBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);



module.exports = router;