import { useNavigate } from 'react-router-dom'
import './NewsPost.css'

function NewsPost({id, title, createdAt, text, genre}: IPost) {
  const navigate = useNavigate()
  
  return (
    <div className='post' onClick={() => navigate(`${id}`)}>
        <h1 className='post__title'>{title}</h1>
        <div className='post__information'> 
          <p className='post__date'>{createdAt}</p>
          <p className='post__genre'>{genre}</p>
        </div>
        <p className='post__text'>{text}</p>

    </div>
  )
}

export default NewsPost
