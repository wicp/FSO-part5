import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import Notification from "./components/Notification"
import Toggleable from "./components/Toggleable"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [formVisibility, setFormVisibility] = useState(false)
  const [notificationQueue, setNotificationQueue] = useState([])

  const notificationRef = useRef(notificationQueue)
  notificationRef.current = notificationQueue

  const dequeNotification = () => {
    setNotificationQueue(notificationRef.current.slice(1))
  }
  const pushNotification = (notification) => {
    setNotificationQueue([...notificationQueue, notification])
    setTimeout(dequeNotification, 2000)
  }

  const logout = () => {
    window.localStorage.removeItem("loggedInUser")
    setUser(null)
  }

  const addBlog = (blog) => {
    setBlogs([...blogs, blog])
    setFormVisibility(false)
  }

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
  }, [])

  const notificationJSX = notificationQueue.map((notification, index) => (
    <Notification
      key={index}
      message={notification.message}
      kind={notification.kind}
    />
  ))
  if (!user)
    return (
      <div>
        {notificationJSX}
        <LoginForm setUser={setUser} pushNotification={pushNotification} />
      </div>
    )

  return (
    <div>
      <h2>blogs</h2>
      {notificationJSX}
      <p>
        Welcome, {user.name}
        <button onClick={logout}>Logout</button>
      </p>
      <Toggleable
        label="Submit new blog"
        visible={formVisibility}
        setVisible={setFormVisibility}
      >
        <BlogForm
          user={user}
          addBlog={addBlog}
          pushNotification={pushNotification}
          closeForm={() => setFormVisibility(false)}
        />
      </Toggleable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  )
}

export default App
