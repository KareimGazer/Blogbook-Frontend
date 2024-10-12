import { useState } from "react"
import { getAllBlogs, createBlog } from "../services/blogs"

const BlogCreator = ({setNotification, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        const blog = { title, author, url }
        try {
            await createBlog(blog)
            setBlogs(await getAllBlogs())
            setTitle('')
            setAuthor('')
            setUrl('')
            setNotification('Blog created successfully')
        }
        catch (exception) {
            setNotification('Failed to create blog')
        }
        
    }
    return (
        <form onSubmit={addBlog}>
            <h2>Create new blog</h2>
            <div>
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" onChange={({ target }) => setTitle(target.value)}/>
            </div>
            <div>
                <label htmlFor="author">Author</label>
                <input type="text" name="author" id="author" onChange={({ target }) => setAuthor(target.value)}/>
            </div>
            <div>
                <label htmlFor="url">Url</label>
                <input type="text" name="url" id="url" onChange={({ target }) => setUrl(target.value)}/>
            </div>
            <button id="create-button" type="submit">Create</button>
        </form>  
    )
}

export default BlogCreator
