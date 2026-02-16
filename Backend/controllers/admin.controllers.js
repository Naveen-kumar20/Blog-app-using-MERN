import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Blog from '../models/blog.models.js';
import Comment from '../models/comment.models.js';
import generateWithGemini from '../configs/gemini.js';

const jwtSecret = process.env.JWT_SECRET;

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password required.' });
        }
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.status(401).json({
                success: false,
                message: "Wrong credentials"
            })
        }

        if(!jwtSecret) throw new Error('jwt_secret missing in environment')

        const token = jwt.sign({email}, jwtSecret, {expiresIn: '24h'});
        res.json({
            success: true,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const getAllBlogsAdmin = async(req, res)=>{
    try {
        const blogs = await Blog.find({}).sort({createdAt: -1})
        res.json({
            success: true, 
            blogs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const getAllComments = async(req, res)=>{
    try {
        const comments = await Comment.find({}).populate('blog').sort({createdAt: -1})
        res.json({
            success: true, 
            comments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const getDashboard = async(req, res)=>{
    try {
        const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
        const blogs = await Blog.countDocuments()
        const comments = await Comment.countDocuments()
        const drafts = await Blog.countDocuments({isPublished: false})
        const dashboardData = {
            recentBlogs, blogs, comments, drafts
        }

        res.json({success: true, dashboardData})

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const deleteCommentById = async(req, res)=>{
    try {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid comment id.'
            })
        }

        const deleted = await Comment.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found.'
            })
        }
        res.json({
            success: true,
            message: 'Comment deleted successfully.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const approveCommentById = async(req, res)=>{
    try {
        const { id } = req.body;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid comment id.'
            })
        }

        const deleted = await Comment.findByIdAndUpdate(id, {isApproved: true});
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Comment not found.'
            })
        }
        res.json({
            success: true,
            message: 'Comment Approved successfully.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.'
        })
    }
}

export const generateContent = async(req, res)=>{
    try {
        const {prompt} = req.body;
        console.log("Generating content with AI...🟡")
        const geminiResultContent = await generateWithGemini(prompt + 'Generate a blog content for this topic in simple text format.')
        console.log("AI generation successfull.✅")
        res.json({success: true, geminiResultContent})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: 'Something went wrong, while generating content.'})
    }
}