

function Newsletter() {
  return (
    <div className="flex flex-col items-center justify-center text-center space-y-2 my-32">
        <h1 className="md:text-4xl text-2xl font-semibold">Never miss a blog!</h1>
        <p className="md:text-lg text-gray-500/70 pb-8">Subscribe to get the latest blog.</p>
        <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
            <input className="border border-gray-300 rounded-full h-full border-r-0 outline-none w-full rounded-r-none px-4 text-gray-500" type="email" placeholder="Enter your email" required/>
            <button className="rounded-full md:px-12 px-8 h-full text-(--primary-color) bg-(--secondary-color) hover:bg-zinc-700 transition-all cursor-pointer rounded-l-none" type="submit">Subscribe</button>
        </form>
    </div>
  )
}

export default Newsletter