import { useEffect, useState } from "react"
import blogService from "../services/blogs"
import Notification from "./Notification"

const BlogForm = ({ user, addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notification, setNotification] = useState([null, null])
  const [currentTimeout,setCurrentTimeout] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    try {
      const response = await blogService.create(user, blog)
      addBlog(response.data)
      setNotification([`Added ${title}`, "info"])
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (err) {
      setNotification([err.response.data.error, "error"])
    }
  }
  useEffect(()=> {
    clearTimeout(currentTimeout)
    console.log('clearing')
    setCurrentTimeout(setTimeout(() => setNotification([null,null]),4000))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[notification])

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Blog</h2>
      <Notification message={notification[0]} kind={notification[1]} />
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
