import { useParams } from 'react-router-dom';
import { useBlog } from '../hooks/useBlog';
import { Navbar } from '../components/Navbar';
import { BlogLoader } from '../components/BlogLoader';

const Blog = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, blog } = useBlog({ id: id! });
  console.log(loading);
  console.log(blog);

  return (
    <>
      <Navbar />
      <div className='max-w-[800px] h-screen py-5 mx-auto'>
        {
          loading ? (
            <>
              <BlogLoader />
            </>
          ) : (
            <div className='flex justify-between gap-6'>
              <div className='w-3/4'>
                <h1 className='text-3xl font-bold mb-1 text-pretty'>{blog?.title}</h1>
                <p className='text-gray-500 mb-3'>
                  Posted on{" "}
                  {new Date(blog?.publishDate ?? "").toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className='font-serif text-balance'>{blog?.content}</p>
              </div>
              <div className='w-1/4'>
                <h3 className='mb-2 font-semibold'>Author</h3>
                <div className='flex items-center gap-3'>
                  <div className="w-10 h-10 flex justify-center items-center bg-blue-200 rounded-full cursor-pointer">
                    <span className="text-blue-900 font-semibold">
                      {blog?.author.name.split(" ").map(word => word[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div>{blog?.author?.name}</div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
};

export default Blog;
