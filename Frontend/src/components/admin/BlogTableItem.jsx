import { MdDeleteForever } from "react-icons/md";


function BlogTableItem({blog, fetchBlogs, index}) {

    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt)
  return (
    <tr className="border-y border-gray-300">
        <th className="px-2 py-4">{index}</th>
        <td className="px-2 py-4">{title}</td>
        <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
        <td className="px-2 py-4 max-sm:hidden">
            <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>{blog.isPublished ? 'Published' : 'Unpublished'}</p>
        </td>
        <td className="px-2 py-4 flex justify-between items-center text-xs gap-3">
            <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer">{blog.isPublished ? "Unpublish" : "Publish"}</button>
            <span className="w-8 text-2xl hover:scale-110 transition-all cursor-pointer">
                <MdDeleteForever />
            </span>
        </td>

    </tr>
  )
}

export default BlogTableItem