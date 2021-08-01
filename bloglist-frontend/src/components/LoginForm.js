import { useState } from "react"
import userService from "../services/users"

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.login({ username, password })
      window.localStorage.setItem("loggedInUser", JSON.stringify(user))
      setUser(user)
    } catch {
      return "error"
    } finally {
      setUsername("")
      setPassword("")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
