const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require("fs");

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.filename+ '-' + uniqueSuffix + ".jpeg");
    }
})

const multerFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }
    else{
        cb( {message: "Not an image! Please upload only images."}, false);
    }
};

const uploadPhoto = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits:{
        fileSize: 3000000
    }
});

const productImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/products/${file.filename}`);
        //for removing images
        fs.unlinkSync(`public/images/products/${file.filename}`);
      })
    );
    next();
  };

const blogImgResize = async (req, res, next) => {
    if (!req.files) return next();
    await Promise.all(
      req.files.map(async (file) => {
        await sharp(file.path)
          .resize(300, 300)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`public/images/blogs/${file.filename}`);
        fs.unlinkSync(`public/images/blogs/${file.filename}`);
      })
    );
    next();
  };
  
  module.exports = { uploadPhoto, productImgResize, blogImgResize };
