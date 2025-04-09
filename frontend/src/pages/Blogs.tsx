import { BlogCard } from "../components/BlogCard";
import { BlogCardLoader } from "../components/BlogCardLoader";
import { Navbar } from "../components/Navbar";
import { useBlogs } from "../hooks/useBlogs";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  return (
    <>
      <Navbar name="Siddhartha Sahu" />
      <div className="max-w-[800px] h-screen mx-auto">
        {
          loading ? (
            <>
              <BlogCardLoader />
            </>
          ) : (
            <>
              {blogs.map(({ id, author, title, content, publishDate }) => (
                <BlogCard key={id} id={id} authorName={author.name} title={title} content={content} publishDate={publishDate} />
              ))}
            </>
          )
        }
      </div>
    </>

  )
}

export default Blogs;