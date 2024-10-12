import { useState } from "react"
import { getAllBlogs, createBlog } from "../services/blogs"

const BlogCreator = ({setNotification, setBlogs, setAddingBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        const blog = { title, author, url, description }
        try {
            await createBlog(blog)
            setBlogs(await getAllBlogs())
            setTitle('')
            setAuthor('')
            setUrl('')
            setDescription('')
            setNotification('Blog created successfully')
            setAddingBlog(false)
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
            <div>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" onChange={({ target }) => setDescription(target.value)}/>
            </div>
            <button id="create-button" type="submit" disabled={!title || !author || !url || !description}>Create</button>
        </form>  
    )
}

export default BlogCreator
