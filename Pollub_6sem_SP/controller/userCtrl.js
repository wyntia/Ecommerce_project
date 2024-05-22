const { generateToken } = require('../config/jwtToken');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');

const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/ValidateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');
const sendEmail = require('./emailCtrl');
const crypto = require('crypto');
const uniqid = require('uniqid');

const createUser = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create a new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
        throw new Error('User already exists');
    }
});

//login user
const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatch(password)) {
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateuser = await User.findByIdAndUpdate(
            findUser.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    }
    else {
        throw new Error('Invalid email or password');
    }
});

//admin login 
const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //check if user exists
    const findAdmin = await User.findOne({ email });
    if (findAdmin.role !== 'admin') throw new Error('You are not an admin');
    if (findAdmin && await findAdmin.isPasswordMatch(password)) {
        const refreshToken = await generateRefreshToken(findAdmin?._id);
        const updateAdmin = await User.findByIdAndUpdate(
            findAdmin.id,
            {
                refreshToken: refreshToken,
            },
            { new: true }
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000,
        });
        res.json({
            _id: findAdmin?._id,
            firstname: findAdmin?.firstname,
            lastname: findAdmin?.lastname,
            email: findAdmin?.email,
            mobile: findAdmin?.mobile,
            token: generateToken(findAdmin?._id),
        });
    }
    else {
        throw new Error('Invalid email or password');
    }
});

//handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error('No cookie found');
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) throw new Error('No refresh token found');
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('Invalid refresh token');
        }
        const accessToken = generateToken(user?.id);
        res.json({ accessToken });
    });
});

//logout user
const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie?.refreshToken) {
        throw new Error("No cookie found");
    }
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({ refreshToken });
    if (!user) {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });
        return res.sendStatus(204); //forbidden
    }
    await User.findOneAndUpdate({ refreshToken: refreshToken }, {
        refreshToken: "",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
    });
    res.sendStatus(204); //forbidden
});

//update a user
const updateaUser = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },
            {
                new: true,
            });
        res.json(updatedUser);
    }
    catch (error) {
        throw new Error(error);
    }
});

//save user address
const saveAdress = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const updatedUser = await User.findByIdAndUpdate(_id, {
            address: req?.body?.address,
        },
            {
                new: true,
            });
        res.json(updatedUser);
    }
    catch (error) {
        throw new Error(error);
    }

});

//get all users
const getallUser = asyncHandler(async (req, res) => {
    try {
        const getUsers = await User.find({});
        res.json(getUsers);
    }
    catch (error) {
        throw new Error(error);
    }

});

//get a single user
const getaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const getaUser = await User.findById(id);
        res.json({ getaUser });
    }
    catch (error) {
        throw new Error(error);
    }
});

//delete a user
const deleteaUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const deleteaUser = await User.findByIdAndDelete(id);
        res.json({ deleteaUser });
    }
    catch (error) {
        throw new Error(error);
    }
});

const blockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const block = await User.findByIdAndUpdate(id, {
            isBlocked: true,
        },
            {
                new: true,
            });
        res.json({
            message: 'User blocked successfully',
        });
    }
    catch (error) {
        throw new Error(error);
    }
});

const unblockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const unblock = await User.findByIdAndUpdate(id, {
            isBlocked: false,
        },
            {
                new: true,
            });
        res.json({
            message: 'User unblocked successfully',
        });
    }
    catch (error) {
        throw new Error(error);
    }
});

const updatePassword = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { password } = req.body;
    validateMongodbId(_id);
    const user = await User.findById(_id);
    if (password) {
        user.password = password;
        const updatedPassword = await user.save();
        res.json(updatedPassword);
    }
    else {
        res.json(user);
    }
});

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found with this email");
    try {
        const token = await user.createPasswordResetToken();
        await user.save();
        const resetURL = `Hi, Please follow this link to reset Your Password. This link is valid for 10 minutes from now. <a href='http://localhost:5000/api/user/reset-password/${token}'>Click Here</>`;
        const data = {
            to: email,
            text: "Hey User",
            subject: "Forgot Password Link",
            html: resetURL,
        };
        sendEmail(data);
        res.json(token);
    } catch (error) {
        throw new Error(error);
    }
});

const resetPassword = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });
    if (!user) throw new Error('Token is invalid or has expired');
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);
});

const getWishList = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const finduser = await User.findById(_id).populate('wishlist');
        res.json(finduser);
    }
    catch (error) {
        throw new Error(error);
    }
});

const userCart = asyncHandler(async (req, res) => {
    const { productId, color, quantity, price } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        let cart = await Cart.findOne({ userId: _id });
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId && p.color._id.toString() === color._id);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
            cart.products[productIndex].price = price * cart.products[productIndex].quantity;
        } else {
            cart.products.push({ productId, color, quantity, price: price * quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const getUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        let cart = await Cart.findOne({ userId: _id }).populate("products.productId").populate("products.color");

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out products that don't exist
        cart.products = cart.products.filter(product => product.productId && product.color);

        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const emptyCart = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const user = await User.findOne({ _id });
        const cart = await Cart.findOneAndDelete({ orderBy: user._id });
        res.json(cart);
    } catch (error) {
        throw new Error(error);
    }
});

const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    const validCoupon = await Coupon.findOne({ name: coupon });
    console.log(validCoupon);
    if (validCoupon === null) {
        throw new Error("Invalid coupon");
    }
    const user = await User.findOne({ _id });
    let { products, cartTotal } = await Cart.findOne({ orderBy: user._id }).populate("products.product");
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);
    await Cart.findOneAndUpdate({ orderBy: user._id }, { totalAfterDiscount }, { new: true });
    res.json(totalAfterDiscount);
});

const createOrder = asyncHandler(async (req, res) => {
    const { COD, couponApplied } = req.body;
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        if (!COD) throw new Error("Create order failed");
        const user = await User.findById(_id);
        let userCart = await Cart.findOne({ orderBy: user._id });
        let finallAmount = 0;
        if (couponApplied && userCart.totalAfterDiscount) {
            finallAmount = userCart.totalAfterDiscount;

        }
        else {
            finallAmount = userCart.cartTotal;
        }

        let newOrder = await new Order({
            products: userCart.products,
            paymentIntent: {
                id: uniqid(),
                method: "COD",
                amount: finallAmount,
                status: "Cash on Delivery",
                created: Date.now(),
                currency: "USD"
            },
            orderedBy: user._id,
            orderStatus: "Cash on Delivery",
        }).save();
        let update = userCart.products.map((item) => {
            return {
                updateOne: {
                    filter: { _id: item.product._id },
                    update: { $inc: { quantity: -item.count, sold: +item.count } },
                }
            }
        });
        const updated = await Product.bulkWrite(update, {});
        res.json({ message: "Order created successfully", newOrder });
    }
    catch (error) {
        throw new Error(error);
    }

});

const getOrders = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongodbId(_id);
    try {
        const orders = await Order.findOne({ orderedBy: _id })
            .populate("products.product")
            .populate("orderedBy")
            .exec();
        res.json(orders);
    }
    catch (error) {
        throw new Error(error);
    }
});

const updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const findOrder = await Order.findByIdAndUpdate(id, {
            orderStatus: status,
            paymentIntent: {
                status: status,
            },
        },
            {
                new: true,
            });
        res.json(findOrder);

    }
    catch (error) {
        throw new Error(error);
    }
});

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const alluserorders = await Order.find()
            .populate("products.product")
            .populate("orderedBy")
            .exec();
        res.json(alluserorders);
    } catch (error) {
        throw new Error(error);
    }
});

const getOrderByUserId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongodbId(id);
    try {
        const userorders = await Order.findOne({ orderedBy: id })
            .populate("products.product")
            .populate("orderedBy")
            .exec();
        res.json(userorders);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = {
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
    getAllOrders,
    getOrderByUserId
};
