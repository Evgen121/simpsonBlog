import './App.css';
import { Routes, Route } from "react-router-dom";
import Layout from './Layout';
import HomePage from './pages/HomePage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { UserContextProvider } from './userContext';
import CreatePost from './pages/createPost/CreatePost';
import PostPage from './pages/postPage/PostPage';
import EditPost from './pages/editPost/EditPost';

function App() {
  return (

    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>

  );
}

export default App;
