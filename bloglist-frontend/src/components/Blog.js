import { useState } from "react"

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false)
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
          <p>likes {blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </>
      ) : (
        ""
      )}
    </div>
  )
}

export default Blog
