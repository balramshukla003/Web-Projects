import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing.jsx'
import BlogPage from '../pages/BlogPage.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/SignUp.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Feed from '../pages/Feed.jsx';
import Post from '../pages/Post.jsx';
import Profile from '../pages/Profile.jsx';
import AboutUs from '../pages/About.jsx';

const ProjectRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path='/blog' element={<BlogPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/user' element={<Sidebar />}>
                <Route path='feeds' element={<Feed />} />
                <Route path='post' element={<Post />} />
                <Route path='profile' element={<Profile />} />
            </Route>
        </Routes>
    );
}

export default ProjectRoute
