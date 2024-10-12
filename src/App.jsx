import { useState, useEffect } from 'react'
import { getAllBlogs, setToken } from './services/blogs'
import { login } from './services/login'

import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/forms/LoginForm'
import BlogCreator from './components/BlogCreator'

function App() {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [noftificationMessage, setNoftificationMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      setUser(user)
      setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      showNotification('Wrong credentials')
    }
  }

  const showNotification = (message) => {
    setNoftificationMessage(message)
    setTimeout(() => {
      setNoftificationMessage(null)
    }, 5000);
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  useEffect(() => {
    try {
      async function getBlogs() {
        const blogs = await getAllBlogs()
        setBlogs(blogs)
      }
      getBlogs()
    }
    catch (exception) {
      console.log(exception)
    }
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  return (
    <>
      <Notification message={noftificationMessage} />
      <h1>Blogbook</h1>
      {user && <h3>Hello, {user.name} !</h3>}
      {user && <button onClick={handleLogout}>Logout</button>}
      {!user && <LoginForm login={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      {user && <BlogCreator setNotification={showNotification} setBlogs={setBlogs}/>}
      <div className="blogs">
        {blogs
          .filter((blog) => user)
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                title={blog.title}
                author={blog.author}
                url={blog.url}
                likes={blog.likes}
              />
            )
          })}
      </div>
    </>
  )
}

export default App
