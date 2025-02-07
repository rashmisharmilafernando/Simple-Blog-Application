import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import * as DateHanlder from '../util/dataHandler';

interface Data {
  id: number,
  publishedDate: string,
  title: string,
  description: string,
  author:string
}
const MyBlogs = (): JSX.Element => {

  const navigate = useNavigate();

  const [data, setData] = useState<Data[]>([]);


  useEffect(() => {
    const ACCESS_TOKEN = Cookies.get("token");
    if (!ACCESS_TOKEN) {
      navigate("/signin");
    }

    getMyBlogs();

  }, []);

  const getMyBlogs = () => {
    const ACCESS_TOKEN = Cookies.get("token");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': ACCESS_TOKEN
    }
    axios.get("http://localhost:5000/posts/get/my?size=10&page=1", { headers: headers })
      .then(r => {
        console.log(r.data.data);
        setData(r.data.data);
      })
      .catch(e => {
        Swal.fire({
          icon: "error",
          title: "Sorry!",
          text: "Something went wrong"
        });
      })
  }

  const deleteBlog = (r: any) => {

    Swal.fire({
      icon: "question",
      title: "Are you sure to delete this Blog?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      
      if (result.isConfirmed) {

        let id = r._id;

        const ACCESS_TOKEN = Cookies.get("token");
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': ACCESS_TOKEN
        }

        axios.delete(`http://localhost:5000/posts/${id}`, { headers: headers })
          .then(r => {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Blog deleted successfully!"
            });
            getMyBlogs();
          })
          .catch(e => {
            Swal.fire({
              icon: "error",
              title: "Sorry!",
              text: "Something went wrong"
            });
          })

      }
    });
  }

  return (
    <section>
      <div className={'my-5 mx-20'}>

        <table>

          <thead className={'bg-gray-100'}>
            <tr>
              <th className={'py-5'}>Date</th>
              <th className={'py-5'}>Title</th>
              <th className={'py-5'}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {
              data.map((r: Data, index: number) => {
                return <tr className={'border-b'}>
                  <td className={'w-[15%]'}>{DateHanlder.formateDate(r.publishedDate)}</td>
                  <td className={'w-[50%]'}>{r.title}</td>
                  <td className={'w-[15%]'}>
                  <button className={'bg-blue-600 text-white p-3 rounded-full mx-2'} onClick={() => navigate('/blog', {state: {title: r.title, description: r.description,author:r.author}})}><FaEye /></button>
                        <button className={'bg-green-600 text-white p-3 rounded-full mx-2'} onClick={() => navigate('/newBlogPost', {state: {blog: r}})}><FaPen /></button>
                        <button className={'bg-red-600 text-white p-3 rounded-full mx-2'} onClick={() => deleteBlog(r)}><FaTrash /></button>


                  </td>
                </tr>
              })
            }
          </tbody>

        </table>

      </div>
    </section>
  )
}

export default MyBlogs;