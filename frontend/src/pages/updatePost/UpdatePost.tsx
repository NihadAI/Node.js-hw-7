import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import NewsPostService from '../../API/NewsPostService';
import Button from '../../components/UI/button/Button';
import Header from '../../components/header/Header';

function UpdatePost() {
    const params = useParams<{ id: string}>()
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [message, setMessage] = useState('');
    const [genre, setGenre] = useState<"Politic" | "Business" | "Sport" | "Other">('Other');
    const [isPrivate, setIsPrivate] = useState(false)
  
    const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPost: IPost = {
        title,
        text,
        genre,
        isPrivate
        };
        try {
        const response = await NewsPostService.updatePost(params.id || '', newPost);
        if (response.status === 200) {
            setMessage('Post update successfully!');
            setTimeout(() => {
            setMessage('');
            }, 2000);
        } 
        setTitle('');
        setText('');
        } catch (error) {
        console.error(error);
        }       
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.target.checked);
      };

    return (
        <>
        <Header />
        <div className='create-post__container'>
            <h1 className='create-post__title'>Update your post!</h1>
            <form className='create-post__form' onSubmit={(e) => updatePost(e)}>
            <input
                type='text'
                placeholder='Write post title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type='text'
                placeholder='Write post text'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <select
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value as "Politic" | "Business" | "Sport" | "Other"); 
            }}
          >
            <option value="Other">Other</option>
            <option value="Politic">Politic</option>
            <option value="Business">Business</option>
            <option value="Sport">Sport</option>
          </select>
          <div className="checkbox__main">
            <p>Is news private?</p>
          <div className="checkbox__wrapper">
            <input    
                type="checkbox"
                name="isPrivate"
                checked={isPrivate}
                onChange={handleCheckboxChange}/>
          </div>
          </div>
            <Button variant='' type='submit'>
                Create
            </Button>
            </form>
            {message && <h1 className='create-post__message'>{message}</h1>}
        </div>
        </>
    );
}

export default UpdatePost