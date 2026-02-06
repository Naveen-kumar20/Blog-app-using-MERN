import React, { useEffect, useRef, useState } from 'react'
import uploadImage from '../../assets/upload_area.svg'
import Quill from 'quill'
import { blogCategories } from '../../assets/assets'

function AddBlog() {

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title , setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = ()=>{

  }

  const onSubmitHandler = (e)=>{
    e.preventDefault()
  }

  useEffect(()=>{
    if(!quillRef.current && editorRef.current){
      quillRef.current = new Quill(editorRef.current, {theme: 'snow', placeholder: 'Start writing here...'})
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 shadow rounded'>
        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={!image ? uploadImage : URL.createObjectURL(image)} alt="upload_image" className='mt-2 h-16 rounded cursor-pointer' />
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required/>
        
        <p className='mt-4'>Sub title</p>
        <input type="text" onChange={(e)=>setSubTitle(e.target.value)} value={subTitle} placeholder='Type here' className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' required/>

        <p className='mt-4'>Blog description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'> 
          {/* quill editor div */}
          <div ref={editorRef}></div>
          <button onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4'>Blog category</p>
        <select name="category" onChange={e=> setCategory(e.target.value)} className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
          <option value="">select category</option>
          {blogCategories.map((item, index)=>{
            return <option key={index} value={item}>{item}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish now: </p>
          <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={e=>setIsPublished(e.target.checked)}/>
        </div>

          <button className='mt-8 w-40 h-10 bg-(--secondary-color) text-(--primary-color) rounded-full cursor-pointer text-sm'>Add Blog</button>

      </div>
    </form>
  )
}

export default AddBlog