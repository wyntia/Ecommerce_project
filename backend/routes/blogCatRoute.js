const express = require('express');
const router = express.Router();
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');
const {createCategory, updateCategory, deleteCategory,
    getCategory,
    getAllCategories,
    
} = require('../controller/blogCatCtrl');

router.post('/', authMiddleware, isAdmin,createCategory);
router.put('/:id', authMiddleware, isAdmin,updateCategory);
router.delete('/:id', authMiddleware, isAdmin,deleteCategory);
router.get('/:id', getCategory);
router.get('/', getAllCategories);

module.exports = router;