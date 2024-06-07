const express = require('express');
const router = express.Router();


const { 
    createProduct,
    getaProduct,
    getallProducts,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating,
    uploadImages,
    deleteImages,

} = require('../controller/productCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto, productImgResize } = require('../middlewares/uploadImages');

router.post('/', authMiddleware , isAdmin, createProduct); //only admin can create, update and delete products
router.put('/upload-images', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImages);
router.get('/:id', getaProduct);
router.get('/', getallProducts);
router.put('/wishlist', authMiddleware, addToWishList);
router.put('/rating', authMiddleware, rating);
router.put('/:id', authMiddleware, isAdmin, updateProduct);
router.delete('/:id', authMiddleware, isAdmin,  deleteProduct);
router.delete('/delete-image/:id', authMiddleware, isAdmin,  deleteImages);

module.exports = router;