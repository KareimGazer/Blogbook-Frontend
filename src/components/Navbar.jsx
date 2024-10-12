import { useNavigate } from 'react-router-dom'

const Navbar = ({ user, setUser, setAddingBlog }) => {
    const navigate = useNavigate()
    const handleLogout = () => {
        window.localStorage.removeItem('user')
        setUser(null)
    }
    return (
        <div className="navbar">
            <ul>
                <li>Blogbook</li>
                <li>Our story</li>
                {!user && <li><button onClick={handleLogout}>Sign Up</button></li>}
                {user && <li> <h3> Hello {user.name} !</h3></li>}
                {user && <li><button onClick={() => setAddingBlog(true)}>Add</button></li>}
                <li>{user ? <button onClick={handleLogout}>Logout</button> : <button onClick={() => navigate('/login')}>Login</button>}</li>
            </ul>
        </div>
    );
};

export default Navbar;