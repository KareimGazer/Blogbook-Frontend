import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { getAllBlogs, setToken } from './services/blogs'

import Notification from './components/Notification'
import Navbar from './components/Navbar'
import Blog from './components/Blog'
import LoginForm from './components/forms/LoginForm'
import BlogCreator from './components/BlogCreator'

/**
 * like button
 * delete blog post + window confirmation
 * @returns 
 */

function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [noftificationMessage, setNoftificationMessage] = useState(null)
  const [addingBlog, setAddingBlog] = useState(false)

  const showNotification = (message) => {
    setNoftificationMessage(message)
    setTimeout(() => {
      setNoftificationMessage(null)
    }, 5000);
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
      
      <Router>
        <Navbar user={user} setUser={setUser} setAddingBlog={setAddingBlog}/>
        <h1>Blogbook</h1>
        <Routes>
          <Route path="/login" element={<LoginForm setUser={setUser} showNotification={showNotification} />} />
        </Routes>
      </Router>
      {user && addingBlog && <BlogCreator setNotification={showNotification} setBlogs={setBlogs} setAddingBlog={setAddingBlog} />}
      <div className="blogs">
        {blogs
          .filter((blog) => user)
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => {
            return (
              <Blog
                key={blog.id}
                title={blog.title}
                author={blog.author}
                description={blog.description}
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
