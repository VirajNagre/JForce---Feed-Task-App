import express from "express";
import { protect,admin } from "../middleware/userMiddleware.js";
import {getAllposts,getPostById,createNewPost,getMyPosts,approvePost,deletePost,getAdminAllposts,rejectPost} from '../controllers/postController.js'

const router = express.Router()

router.route('/').get(getAllposts)
router.route('/admin').get(protect,admin,getAdminAllposts)
router.route('/myposts').get(protect,getMyPosts)
router.route('/:id').get(protect,getPostById).patch(protect,admin,approvePost).delete(protect,admin,deletePost)

router.route('/:id/approve').patch(protect, admin, approvePost);
router.route('/:id/reject').patch(protect, admin, rejectPost);

router.route('/new').post(protect,createNewPost)

export default router
