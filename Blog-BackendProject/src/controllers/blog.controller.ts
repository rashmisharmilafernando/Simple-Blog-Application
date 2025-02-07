// Create Blog
import express from "express"; 
import {ObjectId} from "mongodb"; 
import BlogModel from "../models/blog.model"; 
import CustomResponse from "../dtos/custom.response";
import UserModel from "../models/user.model";

export const createBlog = async (req: express.Request, res: any) => {

    try {

        let req_body = req.body;

        let user_id = res.tokenData.user._id;

        console.log(req_body)

        let blogModel = new BlogModel({
            title: req_body.title,
            description: req_body.description,
            author:req_body.author,
            user: new ObjectId(user_id)
        });

        await blogModel.save().then(r => {
            res.status(200).send(
                new CustomResponse(200, "Blog created successfully.")
            )
        }).catch(e => {
            console.log(e)
            res.status(100).send(
                new CustomResponse(100, "Something went wrongs")
            )
        });

    } catch (error) {
        res.status(100).send("Error");
    }
}

// Get All Blog
export const getAllBlogs = async (req: express.Request, res: express.Response) => {
    try {

        let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;

        let blog = await BlogModel.find().limit(size).skip(size * (page - 1));

        let documentCount = await BlogModel.countDocuments();
        let pageCount = Math.ceil(documentCount/size);

        res.status(200).send(
            new CustomResponse(200, "Blog are found successfully", blog, pageCount)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}

// Get blogs By Username
export const getBlogByUsername = async (req: express.Request, res: express.Response) =>{
    try {

        let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;

        let username: string = req.params.username;

        let user:any = await UserModel.findOne({username: username});

        if(!user) {
            res.status(404).send(
                new CustomResponse(404, "User not found")
            )
        } else {
            let blogs = await BlogModel.find({user: user._id}).limit(size).skip(size * (page - 1))

            let documentCount = await BlogModel.countDocuments({user: user._id});
            let pageCount = Math.ceil(documentCount/size);

            res.status(200).send(
                new CustomResponse(200, "Blogs are found successfully", blogs, pageCount)
            )
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}

// Get My blogs
export const getMyBlogs = async (req: express.Request, res: any) => {
    try {

        let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;

        let user_id = res.tokenData.user._id;

        let blogs = await BlogModel.find({user:user_id}).limit(size).skip(size * (page - 1))

        let documentCount = await BlogModel.countDocuments({user: user_id});
        let pageCount = Math.ceil(documentCount/size);

        res.status(200).send(
            new CustomResponse(200, "Blog are found successfully", blogs, pageCount)
        )

    } catch (error) {
        res.status(100).send("Error");
    }
}

// Update Blogs
export const updateBlog = async (req: express.Request, res: any) => {
    try {

        let req_body: any = req.body

        let user_id = res.tokenData.user._id;

        let blogs = await BlogModel.find({_id: req_body.id ,user: user_id})

        console.log('test');

        if(blogs) {

            await BlogModel.findOneAndUpdate({_id: req_body.id}, {
                title: req_body.title,
                description: req_body.description,
                author: req_body.author
            })
                .then(r => {
                    res.status(200).send(
                        new CustomResponse(100, "Blog updated successfully.")
                    )
                }).catch(error => {
                    console.log(error)
                    res.status(100).send(
                        new CustomResponse(100, "Something went wrong.")
                    )
                })

        } else {
            res.stat(401).send(
                new CustomResponse(401, "Access denied")
            )
        }


    } catch (error) {
        res.status(100).send("Error");
    }
}

// Delete Blog
export const deleteBlog = async (req: express.Request, res: any) => {
    try {
        let user_id = res.tokenData.user._id;

        let blog_id: string = req.params.id;

        let blog = await BlogModel.find({_id: blog_id ,user: user_id})

        if(blog) {

            await BlogModel.deleteOne({_id: blog_id}).then(r => {
                res.status(200).send(
                    new CustomResponse(200, "Blogs is deleted successfully.")
                )
            }).catch(e => {
                res.status(100).send(
                    new CustomResponse(100, "Something went wrong.")
                )
            })

        } else {
            res.stat(401).send(
                new CustomResponse(401, "Access denied")
            )
        }

    } catch (error) {
        res.status(100).send("Error");
    }
}