import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';
import axios from 'axios';

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    maxBodyLength: Infinity
                });
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error)  
            }
        };        
        fetchBlogs();
    }, [])


    return (
        {loading, blogs}
    )
};

interface Blog {
    id: string;
    author: {
      name: string;
    };
    title: string;
    content: string;
    publishDate: string;
  }
