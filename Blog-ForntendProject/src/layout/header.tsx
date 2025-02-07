
import React from 'react';
import { Link } from "react-router-dom";

class Header extends React.Component<any, any> {

  render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | Iterable<React.ReactNode> | React.ReactPortal | boolean | any | null | undefined {
    return(
      <header>
        <nav className={'flex justify-between items-center p-5 bg-[#fafafa]'}>
          <h1 className={'text-[#0A3981] text-3xl font-semibold' }>BLOG</h1>  
          <ul className={'flex gap-[4vw]'}>
            <li> <Link to="/Home">Home</Link></li>
            <li><Link to="/MyBlogs">Your Blogs</Link></li>
            <li><Link to="/NewBlogPost">New Blog Post</Link></li>
            <li className='text-black  hover:text-[#0A3981] font-semibold '><Link to="/Login">Login</Link></li>
            <li className='text-black  hover:text-[#0A3981] font-semibold'><Link to="/Signup">Create Account</Link></li>
          </ul>
        </nav>
      </header>
    );
  }

}

export default Header;