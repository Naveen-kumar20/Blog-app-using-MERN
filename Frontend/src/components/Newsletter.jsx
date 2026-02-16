import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext'
import { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('')
  const { axios } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/subscribe', {email})
      toast.success(data.message)
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
      <h1 className="md:text-4xl text-2xl font-semibold">Never miss a blog!</h1>
      <p className="md:text-lg text-gray-500/70 pb-8">Subscribe to get the latest blog.</p>
      <form onSubmit={handleSubmit} className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
        <input onChange={e => setEmail(e.target.value)} value={email} className="border border-gray-300 rounded-full h-full border-r-0 outline-none w-full rounded-r-none px-4 text-gray-500" type="email" placeholder="Enter your email" required />
        <button className="rounded-full md:px-12 px-8 h-full text-(--primary-color) bg-(--secondary-color) hover:bg-zinc-700 transition-all cursor-pointer rounded-l-none" type="submit">Subscribe</button>
      </form>
    </div>
  )
}

export default Newsletter