import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './redux/authSlice';

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        const savedToken = localStorage.getItem('token') || sessionStorage.getItem('token');

        if (savedToken) {
            dispatch(loginSuccess(savedToken));
        }
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignIn />} />
                <Route path="/profile" element={<User />} />
                {/* Route 404 */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;