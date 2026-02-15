import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blog_data, comments_data } from '../assets/assets';
import Navbar from '../components/Navbar';
import gradientBackground from '../assets/gradientBackground.png'
import Moment from 'moment'
import { FaRegUserCircle } from "react-icons/fa";
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

function Blog() {

  const { id } = useParams();

  const { axios } = useAppContext()

  const [data, setData] = useState(null);
  const [comments, setComments] = useState([]);
  const [inputName, setInputName] = useState('')
  const [inputComment, setInputComment] = useState('')

  async function fetchData() {
    try {
      const { data } = await axios.get(`api/blogs/${id}`)
      setData(data.blog)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  async function fetchComments() {
    try {
      const { data } = await axios.post(`api/comments`, { blogId: id })
      setComments(data.comments)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  async function addComment(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`api/add-comment`, { blog: id, name: inputName, content: inputComment })
      toast.success(data.message);
      setInputName('');
      setInputComment('')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    fetchData();
    fetchComments();
  }, [])


  return data ? (
    <div className='relative'>
      <img src={gradientBackground} className='absolute -top-50 -z-1 opacity-50 ' />

      <Navbar />

      {/* published date, title, author */}
      <div className='text-center mt-20 text-gray-600'>
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-(--secondary-color)'>{data.title}</h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
        <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm  bg-(--secondary-color)/80 font-medium text-(--primary-color)'>By Neha</p>
      </div>

      {/* blog image, blog description, comments, comments box */}
      <div className='mx-5 my-10 max-w-5xl mt-6 md:mx-auto'>
        {/* image-- */}
        <img src={data.image} className='rounded-3xl mb-5' />

        {/* blog content-- */}
        <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }}></div>

        {/* comment section-- */}
        <div className='mt-14 mb-10 max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Comment ({comments.length})</p>
          <div className='flex flex-col gap-4'>
            {comments.map((item, index) => (
              <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded-3xl text-gray-600'>
                <div className='flex items-center gap-2 mb-2'>
                  <FaRegUserCircle className='text-xl' />
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* comment section-- */}
        <div className='max-w-3xl mx-auto'>
          <p className='font-semibold mb-4'>Add your comment</p>
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
            <input className='w-ful px-4 py-2 border border-gray-300 rounded-2xl outline-none' onChange={(e) => setInputName(e.target.value)} value={inputName} type="text" placeholder='Name' required />

            <textarea className='w-full p-3 border border-gray-300 rounded-2xl outline-none h-48' onChange={(e) => setInputComment(e.target.value)} value={inputComment} placeholder='Comment here...' required ></textarea>

            <button type='submit' className='bg-(--secondary-color) text-(--primary-color) p-2 px-8 outline-none  rounded-full cursor-pointer'>Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  ) : <Loader />
}

export default Blog