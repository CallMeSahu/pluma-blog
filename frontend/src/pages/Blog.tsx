import { useParams } from 'react-router-dom';

const Blog = () => {
  const { id } = useParams<{ id: string }>(); 

  return (
    <div>Blog {id}</div>
  );
};

export default Blog;
