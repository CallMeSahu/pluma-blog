import { useState } from 'react';
import { Navbar } from '../components/Navbar'
import { CreateBlogSchema } from '@callmesahu/pluma-blog-common';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../config';

const Create = () => {
    const [blog, setBlog] = useState<CreateBlogSchema>({
        title: "",
        content: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const publishButtonHandler = async() => {
        setLoading(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, blog, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const id = response.data.id;
            toast.success("Blog Published Sucessfully!");
            navigate(`/blog/${id}`);
        } catch (error) {
            console.log(error);
            toast.error("Error Creating Blog!")
        } finally {
            setLoading(false);
        }
    };

    const resetButtonHandler = () => {
        setBlog({
            title: "",
            content: ""
        })
    };

    return (
        <>
            <Navbar />
            <div className='max-w-[800px] h-screen py-5 mx-auto flex'>
                <div className='w-3/4'>
                    <textarea
                        placeholder="Title"
                        className="text-3xl mb-2 font-bold w-full outline-none placeholder-gray-400 resize-none overflow-hidden"
                        value={blog.title}
                        rows={1}
                        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                            const target = e.currentTarget;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        onChange={e => setBlog({...blog, title: e.target.value})}
                    />
                    <textarea
                        placeholder="Tell your story..."
                        className="font-serif w-full outline-none placeholder-gray-500 overflow-hidden resize-none text-lg leading-relaxed min-h-[300px]"
                        value={blog.content}
                        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                            const target = e.currentTarget;
                            target.style.height = 'auto';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                        onChange={e => setBlog({...blog, content: e.target.value})}
                    />
                </div>
                <div className='w-1/4 flex justify-center items-start gap-3'>
                    <button onClick={publishButtonHandler} disabled={loading} className='px-5 py-2 text-white bg-zinc-900 rounded-full cursor-pointer'>
                        {
                            loading ? 
                            <div>
                                <svg aria-hidden="true" className="w-5.5 h-5.5 text-gray-600 animate-spin fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                            </div> : "Publish"
                        }
                    </button>       
                    <button onClick={resetButtonHandler} className='px-5 py-1.75 border-1 border-zinc-900 rounded-full cursor-pointer'>Reset</button>       
                </div>
            </div>
        </>
    )
}

export default Create;
