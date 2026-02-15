import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_icon.png';
import { IoIosLogOut } from "react-icons/io";
import Sidebar from '../../components/admin/Sidebar';
import { useAppContext } from '../../context/AppContext';


function Layout() {
   
    const {axios, setToken, navigate} = useAppContext()
    const {logout} = useAppContext()

  return (
    <>
      <div className='flex justify-between items-center py-2 mx-8 sm:mx-20 xl:mx-32'>
          <img onClick={()=>navigate('/')} src={logo} alt="logo" className='cursor-pointer w-20 sm:2-32'/>
  
          <button onClick={logout} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-(--secondary-color) text-(--primary-color) px-8 py-2.5'>Logout
                <IoIosLogOut />
          </button>
      </div>  
      <div className='flex h-[calc(100vh-70px)]'>
          <Sidebar/>
          <Outlet/>
      </div>

    </>
  )
}

export default Layout