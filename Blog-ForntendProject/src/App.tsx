import React from "react";
import Header from "./layout/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./layout/footer";
import Home from "./views/home";
import Login from "./views/login";
import MyBlogs from "./views/myBlog";
import Signup from "./views/signUp";
import NewBlog from "./views/NewBlog";
import Blog from "./views/blog";

class App extends React.Component<any, any> {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login/>} />  
            <Route path="/myBlogs" element={<MyBlogs/>} /> 
            <Route path="/newBlogPost" element={<NewBlog/>} /> 
            <Route path="/signup" element={<Signup/>} /> 
            <Route path="/blog" element={<Blog/>} /> 
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }

}

export default App