import express from 'express'
import { adminLogin, approveCommentById, deleteCommentById, generateContent, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/admin.controllers.js';
import { addBlog, addComment, deleteBlog, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blog.controllers.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// admin routes
router.post('/admin/login', adminLogin);
router.get('/admin/comments', auth, getAllComments);
router.get('/admin/blogs', auth, getAllBlogsAdmin);
router.delete('/admin/comment/:id', auth, deleteCommentById);
router.post('/admin/approve-comment', auth, approveCommentById);
router.get('/admin/dashboard', auth, getDashboard);



// blog routes
router.post('/blog/add', upload.single('image'), auth, addBlog);
router.get('/blogs', getAllBlogs);
router.get('/blogs/:id', getBlogById);
router.patch('/blog/toggle-publish', auth, togglePublish);
router.delete('/blogs/:id', auth, deleteBlog);
router.post('/add-comment', addComment);
router.post('/comments', getBlogComments);

router.post('/admin/generate', auth, generateContent)

export default router;