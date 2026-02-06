import { useEffect, useState } from "react";
import { FaBlog, FaComments } from "react-icons/fa";
import { RiDraftFill } from "react-icons/ri";
import { FaNewspaper } from "react-icons/fa6";
import BlogTableItem from "../../components/admin/BlogTableItem";
import { dashboard_data } from "../../assets/assets";

function Dashboard() {

  const [dashboardData, setDashboardData] = useState({
    blogs: 12,
    comments: 3,
    drafts: 6,
    recentBlogs: []
  })

  const fetchDashboardData = ()=>{
    setDashboardData(dashboard_data)
  }

  useEffect(()=>{
    fetchDashboardData();
  }, [])


  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 overflow-scroll">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <FaBlog className="text-2xl"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.blogs}</p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <FaComments className="text-2xl"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.comments}</p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <RiDraftFill className="text-2xl"/>
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashboardData.drafts}</p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* latest blogs table */}
      <div>
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <FaNewspaper />
          <p>Latest Blogs</p>
        </div>
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs text-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-4 xl:px-6">#</th>
                <th scope="col" className="px-2 py-4">BLOG TITLE</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">DATE</th>
                <th scope="col" className="px-2 py-4 max-sm:hidden">STATUS</th>
                <th scope="col" className="px-2 py-4">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentBlogs.map((blog, index)=>{
                return <BlogTableItem key={blog.id} blog={blog} fetchBlogs={dashboardData.fetchBlogs} index={index+1}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard