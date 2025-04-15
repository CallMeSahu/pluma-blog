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

    const navigate = useNavigate();

    const publishButtonHandler = async() => {
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
                    <button onClick={publishButtonHandler} className='px-5 py-2 text-white bg-zinc-900 rounded-full cursor-pointer'>Publish</button>       
                    <button onClick={resetButtonHandler} className='px-5 py-1.75 border-1 border-zinc-900 rounded-full cursor-pointer'>Reset</button>       
                </div>
            </div>
        </>
    )
}

export default Create;
