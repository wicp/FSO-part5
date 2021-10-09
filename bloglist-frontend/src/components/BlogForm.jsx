import { useState,useRef } from "react"
import blogService from "../services/blogs"
import Notification from "./Notification"

const BlogForm = ({ user, addBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [notificationQueue, setNotificationQueue] = useState([])

  const notificationRef = useRef(notificationQueue)
  notificationRef.current = notificationQueue

  const dequeNotification = () => {
    console.log("deque", notificationQueue)
    setNotificationQueue(notificationRef.current.slice(1))
  }
  const pushNotification = (notification) => {
    setNotificationQueue([...notificationQueue, notification])
    setTimeout(dequeNotification,2000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blog = { title, author, url }
    try {
      const response = await blogService.create(user, blog)
      addBlog(response.data)
      pushNotification({ message: `Added ${title}`, kind: "info" })
      setTitle("")
      setAuthor("")
      setUrl("")
    } catch (err) {
      pushNotification([err.response.data.error, "error"])
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Blog</h2>
      {notificationQueue.map((notification, index) => (
        <Notification key={index} message={notification.message} kind={notification.kind} />
      ))}
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
