import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export const useBlog = ( {id}: {id: string} ) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlog = async() => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          maxBodyLength: Infinity
        })
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlog()
  }, [id]);

  return (
    { loading, blog }
  )
};

interface Blog{
  title: string,
  content: string,
  publishDate: string,
  author: {
    name: string
  }
}
