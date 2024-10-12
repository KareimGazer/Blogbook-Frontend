import { useState } from "react"
const Blog = ({ title, author, url, likes, description }) => {
    const [detailed, setDetailed] = useState(false)
    return (
        <div className="blog">
            <ul>
                <li>{title}</li>
                <li>{author}</li>
                {detailed && <li>{url}</li>}
                {detailed && <p>{description}</p>}
                <li>{likes}</li>
            </ul>
            <button onClick={() => setDetailed(!detailed)}> {detailed ? 'show less' : 'show more'}</button>
        </div>
    )
}

export default Blog
