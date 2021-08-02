import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }
  
  const addBlog = blog => setBlogs([...blogs,blog])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  
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
        Welcome, {user.name} 
        <button onClick={logout}>Logout</button>
      </p>
      <BlogForm user={user} addBlog={addBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
