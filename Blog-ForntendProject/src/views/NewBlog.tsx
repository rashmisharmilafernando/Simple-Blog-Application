import React, { useEffect, useState } from 'react';
import Input from "./../components/input/input";
import * as ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router-dom";

function NewBlog(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();

    let blog = location?.state?.blog;

    const [title, setTitle] = useState<string>(blog ? blog.title : "");
    const [description, setDescription] = useState<string>(blog ? blog.description : "");
    const [author, setAuthor] = useState<string>(blog ? blog.author : "");

    useEffect(() => {
        //get token
        const ACCESS_TOKEN = Cookies.get("token");
        //check token -> redirect
        if (!ACCESS_TOKEN) {
            navigate("/signin");
        }
    }, []);

    const handleTitle = (e: any, type: string) => {
        setTitle(e.target.value);
    }

    const handleAuthor = (e: any, type: string) => {
        setAuthor(e.target.value);
    }

    const handleEditor = (html: React.SetStateAction<string>): void => {
        console.log(html);
        setDescription(html)
    }

    const validateSubmission = () => {

        console.log(title)
        console.log(description)

        if (title && description) {
            submitBlog();
        } else {
            Swal.fire({
                icon: "error",
                title: "Invalid Inputs",
                text: "Please enter valid inputs"
            });
        }
    }

    const submitBlog = () => {
        const ACCESS_TOKEN = Cookies.get("token");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': ACCESS_TOKEN
        };

        const body = blog ? {
            id: blog._id,
            title: title,
            description: description,
            author: author
        } : {
            title: title,
            description: description,
            author: author
        }

        if (blog) {

            axios.put("http://localhost:5000/blog/editpost", body, { headers })
                .then((r) => {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Blog updated successfully!"
                    });
                    navigate("/home");
                })
                .catch((e) => {
                    Swal.fire({
                        icon: "error",
                        title: "Sorry!",
                        text: "Something went wrong"
                    });
                });
        } else {

            axios.post("http://localhost:5000/blog/addpost", body, { headers })
                .then((r) => {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Blog created successfully!"
                    });
                })
                .catch((e) => {
                    Swal.fire({
                        icon: "error",
                        title: "Sorry!",
                        text: "Something went wrong"
                    });
                });
        }
    };

    return (
        <section className='px-28'>
            <div className={'text-right mt-5'}>
                <button className={'second-btn mr-1'}>Clear</button>
                <button className={'main-btn ml-1'} onClick={validateSubmission} >{blog ? "Update" : "Publish"}</button>
            </div>
            <div>
                <Input
                    type={'title'}
                    name="title"
                    label="Title"
                    placeholder="Enter your Title"
                    optional={true}
                    callBack={handleTitle}
                    value={title}

                />

                {/* Rich Text editor */}

                <div className={"m-2"}>
                    <ReactQuill theme="snow" value={description} onChange={handleEditor} />
                </div>

                <Input
                    type={'author'}
                    name="author"
                    label="author"
                    placeholder="Your Name"
                    optional={true}
                    callBack={handleAuthor}
                    value={author}

                />
            </div>
        </section>
    )
}

export default NewBlog;