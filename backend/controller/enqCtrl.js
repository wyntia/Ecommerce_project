const Enquiry = require('../models/enqModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require('../utils/ValidateMongodbId');

const createEnquiry= asyncHandler(async (req, res) => {
    try{
        const newEnquiry= await Enquiry.create(req.body);
        res.json(newEnquiry)
    }
    catch(error){
        throw new Error(error);
    }
});

const updateEnquiry= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const updatedEnquiry= await Enquiry.findByIdAndUpdate(id, req.body,{
            new:true,
        });
        res.json(updatedEnquiry)
    }
    catch(error){
        throw new Error(error);
    }
});

const deleteEnquiry= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const deletedEnquiry= await Enquiry.findByIdAndDelete(id, req.body,{
            new:true,
        });
        res.json(deletedEnquiry)
    }
    catch(error){
        throw new Error(error);
    }
});

const getEnquiry= asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const getaEnquiry= await Enquiry.findById(id, req.body);
        res.json(getaEnquiry)
    }
    catch(error){
        throw new Error(error);
    }
});

const getAllEnquiries= asyncHandler(async (req, res) => {
    try{
        const getaEnquiry= await Enquiry.find();
        res.json(getaEnquiry)
    }
    catch(error){
        throw new Error(error);
    }
});

module.exports = {createEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getEnquiry,
    getAllEnquiries
};