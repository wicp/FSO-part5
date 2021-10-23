import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, user }) => {
  const [showMore, setShowMore] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const addLike = () => {
    const updatedBlog = {...blog, likes: likes+1}
    try {
      blogService.update(user, updatedBlog)
    }
    finally {
      setLikes(likes+1)
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      <p>
        {blog.title} - {blog.author}
        <button onClick={() => setShowMore(!showMore)}>
          {showMore ? "hide" : "view"}
        </button>
      </p>
      {showMore ? (
        <>
          <p>{blog.url}</p>
          <p>likes {likes} <button onClick={addLike}>like</button></p>
          <p>{blog.user.name}</p>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default Blog
