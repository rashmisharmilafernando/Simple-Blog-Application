import mongoose, {Document} from "mongoose";
import {ObjectId} from "mongodb";

export interface IBlog extends mongoose.Document {
    title: string,
    description: string,
    author:string,
    publishedDate: Date,
    user: ObjectId
}

export interface Iuser extends Document {
    username: string,
    name: string, 
    email: string,
    password: string,
}