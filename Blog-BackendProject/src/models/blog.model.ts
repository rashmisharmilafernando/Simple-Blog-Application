import mongoose from "mongoose";
import {ObjectId} from "mongodb";
import * as SchemaType from "../types/SchemaTypes";

const BlogSchema = new mongoose.Schema<SchemaType.IBlog>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    author:{type: String, required: true},
    publishedDate: {type: Date, required: true, default: Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user'}
})

const BlogModel = mongoose.model("Blogs", BlogSchema);
export default BlogModel;