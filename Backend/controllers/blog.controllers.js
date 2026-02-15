import mongoose from 'mongoose';
import Blog from '../models/blog.models.js';
import Comment from '../models/comment.models.js';
import uploadToS3 from '../utils/s3Upload.js'

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, category, description, isPublished = false } = JSON.parse(req.body.blog);
        
        const imageFile = req.file;

        if (!title || !category || !description || !imageFile) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        const imageUrl = await uploadToS3(imageFile)

        await Blog.create({ title, subTitle, category, description, isPublished, image: imageUrl })
        console.log("Blog added successfully✅");

        res.json({
            success: true,
            message: 'Blog added successfully'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while adding blog.'
        })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })

        res.json({
            success: true,
            blogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong while getting blogs.'
        })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid blog id.' })
        }
        const blog = await Blog.findOne({_id:  id, isPublished: true});

        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })


        res.json({ success: true, blog })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while fetching this blog.' })
    }
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid blog id.' })
        }
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' })
        }
        blog.isPublished = !blog.isPublished;

        await blog.save();
        res.json({ success: true, message: 'Blog status updated.' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while, updating publish status.' })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid blog id.' })
        }
        const deleted = await Blog.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found.'
            })
        }

        // Delete all comments associated with the blog.
        await Comment.deleteMany({ blog: id });

        res.json({ success: true, message: 'Blog deleted successfully.' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while deleting the blog.' })
    }
}

export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({ blog, name, content });
        res.json({ success: true, message: 'Comment added for review.' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while adding comment.' })
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        if (!blogId || !mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ success: false, message: 'Invalid blog id.' })
        }
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong while fetching comments.' })
    }
}