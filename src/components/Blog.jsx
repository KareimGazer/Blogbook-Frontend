const Blog = ({ title, author, url, likes }) => {

    return (
        <div className="blog">
            <ul>
                <li>{title}</li>
                <li>{author}</li>
                <li>{url}</li>
                <li>{likes}</li>
            </ul>
        </div>
    )
}

export default Blog
