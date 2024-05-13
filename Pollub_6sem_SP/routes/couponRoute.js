const express = require('express');
const router = express.Router();
const { createCoupon,
    getAllCoupons,
    deleteCoupon,
    updateCoupon,
} = require('../controller/couponCtrl');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');

router.post('/',authMiddleware, isAdmin ,createCoupon);
router.get('/',authMiddleware, isAdmin ,getAllCoupons);
router.delete('/:id',authMiddleware, isAdmin ,deleteCoupon);
router.put('/:id',authMiddleware, isAdmin ,updateCoupon);

module.exports = router;