import greenTick from '../../assets/tick_icon.svg'
import { MdDeleteOutline } from "react-icons/md";
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


function CommentTableItem({comment, fetchComments}) {
  
    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt);

    const {axios} = useAppContext()

    const approveComment = async () => {
        try {
            const {data} = await axios.post('/api/admin/approve-comment', {id: _id})
            toast.success(data.message)
            fetchComments()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const deleteComment = async () => {
        try {
            const confirm = window.confirm('Are you sure you want to delete this comment?')
            if(!confirm) return
            const {data} = await axios.delete(`/api/admin/comment/${_id}`)
            toast.success(data.message)
            fetchComments()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
  
    return (
    <tr className="order-y border-gray-300">
        <td className="px-6 py-4">
            <b className="font-medium text-gray-600">Blog</b> : {blog.title}
            <br />
            <br />
            <b className="font-medium text-gray-600">Name</b> : {comment.name}
            <br />
            <b className="font-medium text-gray-600">Comment</b> : {comment.content}
        </td>
        <td className="px-6 py-4 max-sm:hidden">
            {BlogDate.toLocaleDateString()}
        </td>
        <td className="px-6 py-4 ">
            <div className="inline-flex items-center gap-4">
                {!comment.isApproved ? 
                <img onClick={approveComment} src={greenTick} className="w-5 hover:scale-110 transition-all cursor-pointer"/> 
                : 
                <p className="text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1">Approved</p>
                }
                <span onClick={deleteComment} className="text-xl hover:scale-110 transition-all cursor-pointer">
                    <MdDeleteOutline />
                </span>
                    
            </div>
        </td>
    </tr>
  )
}

export default CommentTableItem