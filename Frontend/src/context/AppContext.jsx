import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


const AppContext = createContext()

export function AppProvider({ children }) {

    const navigate = useNavigate()
    const [token, setToken] = useState(null)
    const [blogs, setBlogs] = useState([])
    const [input, setInput] = useState("")

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blogs');
            data.success ? setBlogs(data.blogs) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setToken(null);
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/')
    }

    useEffect(() => {
        fetchBlogs();
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token)
            axios.defaults.headers.common['Authorization'] = token
        }

        // -------------------------------------------------------------------------
        // Cross-Tab Synchronization Listener
        // -------------------------------------------------------------------------
        // This effect listens for changes to 'localStorage' made by OTHER tabs.
        // It ensures that if a user logs in or logs out in one tab, all other 
        // open tabs immediately reflect that state without needing a refresh.
        const handleStorageChange = async (e) => {
            if (e.key === 'token') {
                if (!e.newValue) {
                    // CASE 1: Token was removed in another tab (Logout)
                    // We must clear the state in this tab too.
                    logout();
                } else {
                    // CASE 2: Token was added/updated in another tab (Login)
                    // We must update the state to log the user in here as well.
                    setToken(e.newValue);
                    axios.defaults.headers.common['Authorization'] = e.newValue;
                }
            }
        }

        window.addEventListener('storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }

    }, [])


    let value = { axios, navigate, token, setToken, blogs, setBlogs, input, setInput, logout }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}