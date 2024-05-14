const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const User = require('../models/userModel');
const validateMongodbId = require('../utils/ValidateMongodbId');
const {cloudinaryUpload, cloudinaryDelete} = require('../utils/cloudinary');
const fs = require('fs');

//create a product
const createProduct = asyncHandler(async (req, res) => {
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch(error){
        throw new Error(error);
    }
});

//update a product
const updateProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const updatedProduct = await Product.findOneAndUpdate({_id: id}, req.body, {new: true});
        res.json(updatedProduct);
    }
    catch(error){
        throw new Error(error);
    }
});

//delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongodbId(id);
    try{
        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        res.json(deletedProduct);
    }
    catch(error){
        throw new Error(error);
    }
});

//fetch a single product
const getaProduct = asyncHandler(async (req, res) => {
    const {id}= req.params;
    validateMongodbId(id);
    try{
        const product = await Product.findById(id);
        res.json(product);
    }
    catch(error){
        throw new Error(error);
    }
});

//fetch all products + filtering
const getallProducts = asyncHandler(async (req, res) => {
    try{
        //filtering
        const queryObj = {...req.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach(el => delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        
        let query = Product.find(JSON.parse(queryStr));

        //sorting
        if(req.query.sort){
            const sortBy= req.query.sort.split(',').join(' ');
            query=query.sort(sortBy);
        }
        else{
            query=query.sort('-createdAt');
        }

        //fields limiting
        if(req.query.fields){
            const fields= req.query.fields.split(',').join(' ');
            query=query.select(fields);
        }
        else{
            query=query.select('-__v');
        }

        //pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 100;
        const skip = (page - 1) * limit;
        query=query.skip(skip).limit(limit);
        if(req.query.page){
            const numProducts = await Product.countDocuments();
            if(skip >= numProducts){
                throw new Error('This page does not exist');
            }
        }

        const products = await query;
        res.json(products);
    }
    catch(error){
        throw new Error(error);
    }
});

//filter products by category
const addToWishList = asyncHandler(async (req, res) => {
    const {_id} = req.user; 
    const {prodId} = req.body;
    
    try{
        const user =await User.findById(_id);
        const alreadyAdded= user.wishlist.find((id) => id.toString() === prodId);
        if(alreadyAdded){
            let user = await User.findByIdAndUpdate(_id, {
                $pull: {wishlist: prodId},
            
            },
            {
                new: true,
            });
            res.json(user);
        }
        else{
            let user = await User.findByIdAndUpdate(_id, {
                $push: {wishlist: prodId},
            
            },
            {
                new: true,
            });
            res.json(user);
        }
    }
    catch(error){
        throw new Error(error);
    }
});

const rating= asyncHandler(async (req, res) => {
    const {_id} = req.user; 
    const {star, prodId, comment} = req.body;
    try{
        const product = await Product.findById(prodId);
        let alreadyrated = product.ratings.find((userId) => userId.postedBy.toString() === _id.toString());
        if(alreadyrated){
            const updateRating = await Product.updateOne({
                ratings: { $elemMatch: alreadyrated},
            },
            {
                $set: {'ratings.$.star': star, 'ratings.$.comment': comment},
            },
            {
                new: true,
            });
        }
        else{
            const rateProduct = await Product.findByIdAndUpdate(prodId, {
                $push: 
                    {ratings: 
                        {
                            star: star, 
                            comment: comment,
                            postedBy: _id
                        }},
            },
            {
                new: true,
            });
        }
        const getallrating = await Product.findById(prodId);
        let totalrating = getallrating.ratings.length;
        let sum = getallrating.ratings.map((item) => item.star).reduce((prev, next) => prev + next, 0);
        let actualrating = Math.round(sum / totalrating);
        let productr = await Product.findByIdAndUpdate(prodId, {
            totalrating: Number(actualrating),
        },
        {
            new: true,
        });
        res.json(productr);
    }
    catch(error){
        throw new Error(error);
    }
});

const uploadImages = asyncHandler(async (req, res) => {
    try {
        const uploader = (path) => cloudinaryUpload(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            console.log(newpath);
            urls.push(newpath);
            try {
                fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
                fs.unlinkSync(path);

            } catch (err) {
                //nie wstawiaj jpg
                console.error(`Error removing file ${path}:`, err);
            }
        }
        const images = urls.map((file) => {
            return file;
        });
        res.json(images);
        // const findProduct = await Product.findByIdAndUpdate(
        //     id,
        //     {
        //         images: urls.map((file) => {
        //             return file;
        //         }),
        //     },
        //     {
        //         new: true,
        //     }
        // );
        // res.json(findProduct);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleter = cloudinaryDelete(id, "images");
        res.json({message: "Images deleted successfully"});
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = {
    createProduct, 
    getaProduct,
    getallProducts,
    updateProduct,
    deleteProduct,
    addToWishList,
    rating,
    uploadImages,
    deleteImages,
};
