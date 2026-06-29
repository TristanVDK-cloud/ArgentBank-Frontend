import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
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