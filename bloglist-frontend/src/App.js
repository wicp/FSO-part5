import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  
  const addBlog = blog => setBlogs([...blogs,blog])

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])
  
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser")
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser))
    }
  },[])

  if (!user) return <LoginForm setUser={setUser} />
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {notificationQueue.map((notification, index) => (
          <Notification key={index} message={notification.message} kind={notification.kind} />
        ))}
        Welcome, {user.name} 
        <button onClick={logout}>Logout</button>
      </p>
      <BlogForm user={user} addBlog={addBlog} pushNotification={pushNotification} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
