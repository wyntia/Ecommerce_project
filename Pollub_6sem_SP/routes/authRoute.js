const express = require('express');
const { 
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updateaUser, 
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPassword,
    resetPassword,
    loginAdmin,
    getWishList,
    saveAdress,
    userCart,
    getUserCart,
    emptyCart,
    applyCoupon,
    createOrder,
    getOrders,
    updateOrderStatus,
    getOrderByUserId,
    getAllOrders,
    removeProductFromCart

} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();


router.post('/register', createUser);
router.post('/forgot-password', forgotPassword);

router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.put('/order/update-order/:id', authMiddleware, isAdmin, updateOrderStatus);

router.post('/login', loginUserCtrl);
router.post('/admin-login', loginAdmin);
router.post('/cart', authMiddleware, userCart);
router.post('/cart-applycoupon', authMiddleware, applyCoupon);
router.post('/cart/cash-order', authMiddleware, createOrder);
router.post('/order', authMiddleware, createOrder);

router.get('/all-users', getallUser);
router.get('/get-orders', authMiddleware,getOrders);
router.get('/order/get-order/:id', authMiddleware, getOrderByUserId);
router.get('/orders', authMiddleware, isAdmin, getAllOrders);
router.get('/refresh', handleRefreshToken);
router.get('/logout', logout);
router.get('/wishlist', authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);



router.get('/:id', authMiddleware, isAdmin, getaUser);
router.delete('/cart/:productId', authMiddleware, removeProductFromCart);
router.delete('/empty-cart', authMiddleware, emptyCart);
router.delete('/:id', deleteaUser);


router.put('/edit-user', authMiddleware, updateaUser);
router.put('/save-address', authMiddleware, saveAdress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);


module.exports = router;
