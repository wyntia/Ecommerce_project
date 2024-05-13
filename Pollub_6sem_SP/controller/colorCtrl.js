const Color = require('../models/colorModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/ValidateMongodbId');

const createColor= asyncHandler(async (req, res) => {
    try{
        const newColor= await Color.create(req.body);
        res.json(newColor)
    }
    catch(error){
        throw new Error(error);
    }
});

const updateColor= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const updatedColor= await Color.findByIdAndUpdate(id, req.body,{
            new:true,
        });
        res.json(updatedColor)
    }
    catch(error){
        throw new Error(error);
    }
});

const deleteColor= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const deletedColor= await Color.findByIdAndDelete(id, req.body,{
            new:true,
        });
        res.json(deletedColor)
    }
    catch(error){
        throw new Error(error);
    }
});

const getColor= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const getaColor= await Color.findById(id, req.body);
        res.json(getaColor)
    }
    catch(error){
        throw new Error(error);
    }
});

const getAllColors= asyncHandler(async (req, res) => {
    try{
        const getaColor= await Color.find();
        res.json(getaColor)
    }
    catch(error){
        throw new Error(error);
    }
});

module.exports = {createColor,
    updateColor,
    deleteColor,
    getColor,
    getAllColors
};