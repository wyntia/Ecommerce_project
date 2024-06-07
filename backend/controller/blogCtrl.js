const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const cloudinaryUploadImg = require('../utils/cloudinary');
const validateMongoDBId = require('../utils/ValidateMongodbId');
const fs = require('fs');

const createBlog = asyncHandler(async (req, res) => {
    try{
        const newBlog= await Blog.create(req.body);
        res.json(newBlog)
    }
    catch(error){
        throw new Error(error);
    }
});


const updateBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    try{
        const updateBlog= await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(updateBlog)
    }
    catch(error){
        throw new Error(error);
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    try{
        const getBlog= await Blog.findById(id).populate('likes').populate('dislikes');
        await Blog.findByIdAndUpdate(id, 
            { $inc: { numViews: 1 } }, 
            {
                new: true,
            });
        res.json(getBlog);
    }
    catch(error){
        throw new Error(error);
    }
});

const getAllBlogs = asyncHandler(async (req, res) => {
    try{
        const getBlogs= await Blog.find();
        res.json(getBlogs)
    }
    catch(error){
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler(async (req, res) => {
    const {id} = req.params;
    validateMongoDBId(id);
    try{
        const deleteBlog= await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);
    }
    catch(error){
        throw new Error(error);
    }
});

const likeBlog = asyncHandler(async (req, res) => {
    const {blogId} = req.body;
    validateMongoDBId(blogId);

    //Find a blog that you want to like
    const blog = await Blog.findById(blogId);
    //Find the user who wants to like the blog
    const loginUserId = req?.user?._id;
    //Check if the user has already liked the blog
    const isLiked = blog?.isLiked;
    //Check if the user has already disliked the blog
    const isDisliked = blog?.dislikes?.find( (userId) => userId?.toString() === loginUserId?.toString());

    if(isDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { dislikes: loginUserId },
            isDisliked: false,
        },
        {
            new: true,
        });
       res.json(blog); 
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false,
        },
        {
            new: true,
        });
        res.json(blog);
    }
    else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true,
        },
        {
            new: true,
        });
        res.json(blog);
    }

});
const disliketheBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDBId(blogId);
    const blog = await Blog.findById(blogId);
    const loginUserId = req?.user?._id;
    const isDisLiked = blog?.isDisliked;
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  });


const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
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
        const findBlog = await Blog.findByIdAndUpdate(
            id,
            {
                images: urls.map((file) => {
                    return file;
                }),
            },
            {
                new: true,
            }
        );
        res.json(findBlog);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { 
    createBlog,
    updateBlog,
    getBlog,
    getAllBlogs,
    deleteBlog,
    likeBlog,
    disliketheBlog,
    uploadImages,
};