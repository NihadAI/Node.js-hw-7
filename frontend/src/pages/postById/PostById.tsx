import { useEffect, useState } from 'react'
import NewsPostService from '../../API/NewsPostService';
import { useNavigate, useParams } from 'react-router-dom';
import './PostById.css'
import Header from '../../components/header/Header';
import Loader from '../../components/UI/loader/Loader';
import Button from '../../components/UI/button/Button';
import Modal from '../../components/UI/modal/Modal';

function PostById() {
  const navigate = useNavigate()
  const params = useParams<{ id: string}>()
  const [post, setPost] = useState<IPost>()
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModal = () => {
    setOpenModal(prevState => !prevState);
  };

  const fetchPostById = async (id: string) => {
    const response = await NewsPostService.getPostByID(id);
    setPost(response.data);
  };

  const deletePost = async (id: string) => {
    await NewsPostService.deletePost(id);
    navigate('/'); 
  }

  useEffect(() => {
    fetchPostById(params.id || '')
  }, [params.id])

  if (!post) {
    return <Loader/>;
  }

  return (
    <div className='wrapper__container'>
      <Header/>
      <div className='post__buttons'>
        <Button variant='' onClick={() => navigate(`/update/${params.id}`)}>Update post</Button>
        <Button variant='' onClick={handleModal}>Delete post</Button>
      </div>
      <div className='post__page'>
        <h1 className='post__title'>{post.title}</h1>
        <div className='post__information'>
        <p className='post__date'>{post.createdAt}</p>
        <p className='post__genre'>{post.genre}</p>
        </div>
        <p className='post__full-text'>{post.text}</p>
      </div>
      {openModal && (
                    <Modal
                        header={post.title}
                        closeButton={true}
                        onClose={handleModal}
                        onClick={handleModal}
                        text={'Are you sure you want to delete this post?'}
                        actions={
                            <div className="modal__footer">
                                <Button onClick={() => {deletePost(params.id || '')}}>Yes</Button>
                                <Button onClick={handleModal}>No</Button>
                            </div>
                        }
                    />
                )}
    </div>
    
  )
}

export default PostById;
