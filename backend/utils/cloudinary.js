const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryUpload = async (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (result) => {
            resolve({
                url: result.secure_url,
                asset_id: result.asset_id,
                public_id: result.public_id,
            },
            {
                resource_type: "auto"
            });
        });
    });
};

const cloudinaryDelete = async (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(file, (result) => {
            resolve({
                url: result.secure_url,
                asset_id: result.asset_id,
                public_id: result.public_id,
            },
            {
                resource_type: "auto"
            });
        });
    });
};

module.exports = {cloudinaryUpload, cloudinaryDelete};