import { useEffect, useState } from 'react';
import NewsPost from '../newsPost/NewsPost';
import './NewsList.css';
import NewsPostService from '../../API/NewsPostService';
import Pagination from '../UI/pagination/Pagination';

function NewsList() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);

  const pageSize = 3; 
  const totalPages = Math.ceil(total / pageSize); 

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await NewsPostService.getAllPosts({ page: currentPage - 1, size: pageSize });
        setPosts(response.data.results);
        setTotal(response.data.total);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllPosts();
  }, [currentPage]);

  const renderPosts = posts.map((post) => {
    return <NewsPost key={post.id} title={post.title} createdAt={post.createdAt} text={post.text} id={post.id} genre={post.genre} isPrivate={post.isPrivate} />;
  });

  return (
    <section className='news'>
      <div className='news__container'>
        {renderPosts}
        <div className='pagination__container'>
          <Pagination
            currentPage={currentPage}
            lastPage={totalPages}
            maxLength={7}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}

export default NewsList;
