import { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ user, addBlog, pushNotification }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    try {
      const response = await blogService.create(user, blog)
      pushNotification({ message: `Added ${title}`, kind: "info" })
      setTitle("")
      setAuthor("")
      setUrl("")
      addBlog(response.data)
    } catch (error) {
      pushNotification({ message: error.response.data.error, kind: "error" })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Blog</h2>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm
