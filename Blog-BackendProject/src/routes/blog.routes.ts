import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import BlogModel from "../models/blog.model";
import {ObjectId} from "mongodb";
import CustomResponse from "../dtos/custom.response";
import UserModel from "../models/user.model";
import * as Middleware from "../middlewares/index"
import * as BlogController from "../controllers/blog.controller";

const router = express.Router();

router.post('/addpost', Middleware.verifyToken, BlogController.createBlog);

router.get('/', BlogController.getAllBlogs)

router.get('/:username', BlogController.getBlogByUsername)

router.get('/get/my', Middleware.verifyToken, BlogController.getMyBlogs)

router.put('/editpost', Middleware.verifyToken, BlogController.updateBlog)

router.delete('/:id', Middleware.verifyToken, BlogController.deleteBlog)

export default router;