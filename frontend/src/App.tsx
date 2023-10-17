import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PostById from './pages/postById/PostById';
import CreatePost from './pages/createPost/CreatePost';
import UpdatePost from './pages/updatePost/UpdatePost';
import LogIn from './pages/logIn/LogIn';
import SignIn from './pages/signIn/SignIn';



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<PostById/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/update/:id' element={<UpdatePost/>}/>
     </Routes>
    </div>
  );
}

export default App;
