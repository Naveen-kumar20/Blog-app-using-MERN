import React, { useEffect, useRef, useState } from 'react'
import uploadImage from '../../assets/upload_area.svg'
import Quill from 'quill'
import { blogCategories } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse } from 'marked'

function AddBlog() {

  const { axios } = useAppContext()
  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {
    if (!title) return toast.error('Title is required.')
    try {
      setLoading(true)
      const { data } = await axios.post('/api/admin/generate', { prompt: title })
      
      quillRef.current.root.innerHTML = parse(data.geminiResultContent)

    } catch (error) {
      if (error.response?.data?.message) {
        console.log(error);

        toast.error(error.response.data.message)
      } else {
        toast.error('Error generating content. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      setIsAdding(true);
      const blog = {
        title, subTitle, description: quillRef.current.root.innerHTML, category, isPublished
      }
      const formData = new FormData();
      formData.append('blog', JSON.stringify(blog));
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData);
      toast.success(data.message);
      setImage(false);
      setTitle("");
      setSubTitle('')
      quillRef.current.root.innerHTML = '';
      setCategory('Startup')

    } catch (error) {
      console.log("error", error)
      toast.error(error.response.data.message)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow', placeholder: 'Start writing here...' })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? uploadImage : URL.createObjectURL(image)} alt="upload_image" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required />

        <p className='mt-4'>Sub title</p>
        <input type="text" onChange={(e) => setSubTitle(e.target.value)} value={subTitle} placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required />

        <p className='mt-4'>Blog description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          {/* quill editor div */}
          <div ref={editorRef}></div>
          {loading && (
            <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/10 mt-2'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
            </div>
          )}
          <button disabled={loading} onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog category</p>
        <select name="category" onChange={e => setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">select category</option>
          {blogCategories.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish now: </p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e => setIsPublished(e.target.checked)} />
        </div>

        <button disabled={isAdding} className={`mt-8 w-40 h-10 bg-(--secondary-color) text-(--primary-color) rounded-full cursor-pointer text-sm ${isAdding ? "bg-yellow-600 text-black hover:cursor-not-allowed" : ""}`} >{isAdding ? "Adding..." : "Add Blog"}</button>

      </div>
    </form>
  )
}

export default AddBlog