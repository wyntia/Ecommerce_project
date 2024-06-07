const Category = require('../models/productCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDBId = require('../utils/ValidateMongodbId');

const createCategory= asyncHandler(async (req, res) => {
    try{
        const newCategory= await Category.create(req.body);
        res.json(newCategory)
    }
    catch(error){
        throw new Error(error);
    }
});

const updateCategory= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const updatedCategory= await Category.findByIdAndUpdate(id, req.body,{
            new:true,
        });
        res.json(updatedCategory)
    }
    catch(error){
        throw new Error(error);
    }
});

const deleteCategory= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const deletedCategory= await Category.findByIdAndDelete(id, req.body,{
            new:true,
        });
        res.json(deletedCategory)
    }
    catch(error){
        throw new Error(error);
    }
});

const getCategory= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const getaCategory= await Category.findById(id, req.body);
        res.json(getaCategory)
    }
    catch(error){
        throw new Error(error);
    }
});

const getAllCategories= asyncHandler(async (req, res) => {
    try{
        const getaCategory= await Category.find();
        res.json(getaCategory)
    }
    catch(error){
        throw new Error(error);
    }
});

module.exports = {createCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    getAllCategories
};