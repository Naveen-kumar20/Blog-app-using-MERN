import React from 'react'
import logo from '../assets/logo_icon.png';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate()
    
  return (
    <div className='flex justify-between items-center py-2 mx-8 sm:mx-20 xl:mx-32'>
        <img onClick={()=>navigate('/')} src={logo} alt="logo" className='cursor-pointer w-20 sm:2-32'/>

        <button onClick={()=>navigate('/admin')} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-(--secondary-color) text-(--primary-color) px-8 py-2.5'>Login
            <FaLongArrowAltRight />
        </button>
    </div>
  )
}

export default Navbar